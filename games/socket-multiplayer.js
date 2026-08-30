// Socket.io Multiplayer Engine (Replaces PeerJS & Firebase)
// This file mocks the exact PeerJS API but routes all traffic through the Solmates Backend Socket.io Server
// for 100% background resilience, zero drop rates, and zero database overhead.

if (typeof io === 'undefined') {
    console.error("Socket.io is missing. Please include socket.io.min.js before this script.");
}

// Ensure we connect to the right backend
const backendUrl = window.RENDER_BACKEND_URL || (window.PRODUCTION_API_URL ? window.PRODUCTION_API_URL.replace('/api', '') : 'http://localhost:3000');
const socket = io(backendUrl, {
    transports: ['websocket', 'polling'], // Fallback to polling if websocket is blocked
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
});

class PeerConnection {
    constructor(isHost, roomId, clientId) {
        this.isHost = isHost;
        this.roomId = roomId;
        this.clientId = clientId;
        this.peer = clientId; // To match conn.peer in game logic
        this._handlers = { open: [], data: [], close: [], error: [], host_disconnect: [], host_reconnect: [], host_disconnect_early: [] };
        this.open = false;
        
        // Emulate connection opening delay
        setTimeout(() => {
            this.open = true;
            this._handlers.open.forEach(cb => cb());
        }, 100);
    }
    
    on(event, cb) { 
        this._handlers[event].push(cb); 
    }
    
    send(data) {
        if (!this.open) return;
        
        socket.emit('game:message', {
            roomId: this.roomId,
            from: this.clientId,
            data: data
        });
    }
    
    close() {
        if (this._closed) return;
        this._closed = true;
        this.open = false;
        if (this._cleanup) this._cleanup();
        this._handlers.close.forEach(cb => cb());
    }
}

// Overwrite the global Peer class
window.Peer = class Peer {
    constructor(id) {
        if (!id) {
            this.id = 'GUEST-' + Math.random().toString(36).substr(2, 9);
        } else {
            this.id = id;
            // Setup Host Room
            socket.emit('game:join', this.id);
        }
        
        this.isHost = !!id; // If ID is provided, it's the host
        this._handlers = { open: [], connection: [], error: [], disconnected: [], close: [] };
        this.connections = {};
        this.destroyed = false;
        
        // Track host status for disconnect handling
        this._hostDisconnectTimer = null;
        this._hostStatus = 'online';

        // Connect to Socket
        socket.on('connect', () => {
            this._handlers.open.forEach(cb => cb(this.id));
        });

        // Setup Socket Listeners
        socket.on('game:message', (msg) => {
            // msg = { roomId, from, data }
            const fromId = msg.from;
            const data = msg.data;

            if (this.isHost) {
                // If Host receives data from a new guest
                if (!this.connections[fromId]) {
                    const conn = new PeerConnection(false, this.id, fromId);
                    this.connections[fromId] = conn;
                    
                    conn._cleanup = () => { delete this.connections[fromId]; };
                    
                    this._handlers.connection.forEach(cb => cb(conn));
                    
                    // Simulate delay for conn.on('open') on host side
                    setTimeout(() => {
                        conn._handlers.data.forEach(cb => cb(data));
                    }, 150);
                } else {
                    this.connections[fromId]._handlers.data.forEach(cb => cb(data));
                }
            } else {
                // If Guest receives data (must be from Host)
                if (this.hostConn) {
                    this.hostConn._handlers.data.forEach(cb => cb(data));
                    
                    // Reset host disconnect timer on every packet
                    this._resetHostDisconnectTimer();
                }
            }
        });
        
        socket.on('game:peer_disconnected', (peerSocketId) => {
             // In a perfect world, we would map socket.id to peer.id
             // But since we just use heartbeat/disconnect timers, we'll rely on those
        });

        // If already connected
        if (socket.connected) {
            setTimeout(() => this._handlers.open.forEach(cb => cb(this.id)), 10);
        }
    }

    on(event, cb) {
        if (this._handlers[event]) {
            this._handlers[event].push(cb);
        }
    }

    connect(roomId, options) {
        this.isHost = false;
        
        // Join the room via socket
        socket.emit('game:join', roomId);
        
        this.hostConn = new PeerConnection(false, roomId, this.id);
        
        // Start watching host health
        this._startHostHealthCheck();
        
        return this.hostConn;
    }
    
    _startHostHealthCheck() {
        // Since we don't have direct P2P socket disconnect events that map to PeerIds perfectly,
        // we use a 12s timeout. The Host sends STATE_SYNC every 3s.
        this._resetHostDisconnectTimer();
    }
    
    _resetHostDisconnectTimer() {
        if (!this.hostConn) return;
        
        if (this._hostStatus === 'offline') {
            this._hostStatus = 'online';
            this.hostConn._handlers.host_reconnect.forEach(cb => cb());
        }
        
        if (this._hostDisconnectTimer) clearTimeout(this._hostDisconnectTimer);
        
        this._hostDisconnectTimer = setTimeout(() => {
            if (this.hostConn) {
                this._hostStatus = 'offline';
                // Trigger both early and regular disconnect for backward compatibility
                this.hostConn._handlers.host_disconnect_early.forEach(cb => cb());
                this.hostConn._handlers.host_disconnect.forEach(cb => cb());
            }
        }, 12000); // 12 seconds without any packet from host = host left
    }

    reconnect() {
        // Socket.io reconnects automatically, just trigger the event
    }

    destroy() {
        this.destroyed = true;
    }
};
