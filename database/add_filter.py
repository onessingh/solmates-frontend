import re
import os

path = r'c:\Users\Toshiba\OneDrive\Desktop\solmates\frontend\database\awareness.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Add Dropdown to HTML
c = c.replace(
    '<span class="alert-count" id="alertCount">Loading...</span>',
    '''<div style="display:flex; gap:10px; align-items:center;">
        <span class="alert-count" id="alertCount">Loading...</span>
        <select id="awFilter" onchange="applyFilter()" style="padding:6px 12px; border-radius:20px; border:1px solid rgba(239, 68, 68, 0.2); background:var(--bg-card); color:var(--text-main); font-size:13px; font-weight:700; cursor:pointer; outline:none; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.05);">
          <option value="all">All</option>
          <option value="1st Semester">Semester 1</option>
          <option value="2nd Semester">Semester 2</option>
          <option value="3rd Semester">Semester 3</option>
          <option value="4th Semester">Semester 4</option>
          <option value="Outside">Outsider / Fake</option>
        </select>
      </div>'''
)

# 2. Add applyFilter function
filter_js = '''  function applyFilter() {
    var val = document.getElementById('awFilter').value;
    var filtered = window.allAwarenessAlerts;
    if (val !== 'all') {
      filtered = window.allAwarenessAlerts.filter(function(a) {
        var desc = a.description || '';
        return desc.toLowerCase().indexOf('[' + val.toLowerCase()) !== -1;
      });
    }
    renderAlertsGrid(filtered, true); // true indicates it's a filtered view so we update count
  }
  
  function renderAlertsGrid(alertsArray, isFilterUpdate) {
    var grid = document.getElementById('alertsGrid');
    var countEl = document.getElementById('alertCount');
    
    if (isFilterUpdate) {
      countEl.textContent = alertsArray.length + ' Active Alert' + (alertsArray.length !== 1 ? 's' : '');
    }

    if (alertsArray.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-check-circle"></i><h3>Community is Safe!</h3><p>No reports found matching this filter.</p></div>';
      return;
    }

    var pinned = getPinned();
    var token = localStorage.getItem('solmates_admin_token');
    var isAdmin = !!token || !!(window.solmatesAPI && window.solmatesAPI.isAdminLoggedIn());

    grid.innerHTML = alertsArray.map(function(alert) {
      var id = alert.id || alert._id || '';
      var isPinned = pinned.indexOf(id) !== -1;
      
      var rawTitle = alert.title || '?';
      var avatar = rawTitle.charAt(0).toUpperCase();
      var name = rawTitle;
      if (rawTitle.indexOf('||') !== -1) {
        var parts = rawTitle.split('||');
        avatar = parts[0];
        name = parts[1];
      }

      var images = [];
      var audioUrls = [];
      if (alert.link) {
        try {
          var parsed = JSON.parse(alert.link);
          if (Array.isArray(parsed)) {
            parsed.forEach(function(u) {
              if (u.match(/\\.(mp3|wav|ogg|m4a)$/i) || u.indexOf('catbox.moe') !== -1 || u.startsWith('data:audio/')) audioUrls.push(u);
              else images.push(u);
            });
          } else {
            var u = alert.link;
            if (u.match(/\\.(mp3|wav|ogg|m4a)$/i) || u.indexOf('catbox.moe') !== -1 || u.startsWith('data:audio/')) audioUrls.push(u);
            else images.push(u);
          }
        } catch(e) {
          var u = alert.link;
          if (u.match(/\\.(mp3|wav|ogg|m4a)$/i) || u.indexOf('catbox.moe') !== -1 || u.startsWith('data:audio/')) audioUrls.push(u);
          else images = [u];
        }
      }

      var imagesJson = JSON.stringify(images).replace(/'/g, '&#39;');
      var thumbsHtml = '';
      images.forEach(function(url, i) {
        thumbsHtml += '<img class="screenshot-thumb" src="' + url + '" alt="Proof ' + (i+1) + '" onclick="openProof(\\'' + imagesJson.replace(/"/g, '&quot;') + '\\')" loading="lazy">';
      });
      
      var audioHtml = '';
        audioUrls.forEach(function(u) {
            audioHtml += '<div style="margin-top:10px; margin-bottom:10px;"><audio controls src="' + u + '" style="height:35px; width:100%; border-radius:10px;"></audio></div>';
        });

      var pinBadge = isPinned ? '<div class="pin-badge"><i class="fas fa-thumbtack"></i> Pinned</div>' : '';
      var pinBtn = isAdmin
        ? '<button class="pin-btn ' + (isPinned ? 'pinned' : '') + '" onclick="togglePin(\\'' + id + '\\')">'
          + '<i class="fas fa-thumbtack"></i> ' + (isPinned ? 'Unpin' : 'Pin to Top') + '</button>'
        : '';
      
      var editHtml = isAdmin ? '<button class="pin-btn" onclick="openEditModalById(\\'' + id + '\\')" style="color:#3b82f6; border-color:#3b82f6;"><i class="fas fa-edit"></i> Edit</button>' : '';
      var removeHtml = isAdmin ? '<button class="remove-btn" onclick="removeAlert(\\'' + id + '\\', this)"><i class="fas fa-trash-alt"></i> Remove</button>' : '';

      return '<div id="alert-' + id + '" class="alert-card ' + (isPinned ? 'pinned-card' : '') + '">' +
        '<div class="alert-card-top" style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div style="display:flex; align-items:center; gap:12px;">' +
              '<div class="alert-avatar">' + avatar + '</div>' +
              '<div><div class="alert-name">' + (name || 'Unknown') + '</div>' +
              '<div class="alert-phone"><i class="fas fa-phone-alt"></i> ' + (alert.date || 'Not provided') + '</div></div>' +
            '</div>' +
            '<button onclick="shareAlert(\\'' + id + '\\')" title="Share this Alert" style="background:rgba(100, 116, 139, 0.1); border:1px solid rgba(100, 116, 139, 0.2); color:#64748b; font-size:18px; cursor:pointer; padding:8px 12px; border-radius:10px; transition:0.2s;"><i class="fas fa-share-alt"></i></button>' +
          '</div>' +
        '<div class="alert-body">' +
          pinBadge +
          '<div class="alert-desc">' + formatWhatsAppText(alert.description || 'No description.').replace(/^\\[(.*?)\\](?:<br>\\s*)+/i, '<div class="semester-badge"><i class="fas fa-bullhorn"></i> $1</div><br>') + '</div>' +
          audioHtml +
          '<div class="screenshots-row">' + thumbsHtml + '</div>' +
          (images.length > 0 ? '<button class="proof-btn" onclick="openProof(\\'' + imagesJson.replace(/"/g, '&quot;') + '\\')"><i class="fas fa-search-plus"></i> View & Zoom Proof</button>' : '') +
          pinBtn +
          '<div style="display:flex; gap:8px; margin-top:8px;">' + editHtml + removeHtml + '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }
'''

# 3. Replace the grid logic inside loadAlerts with renderAlertsGrid
c = re.sub(
    r'if\s*\(alerts\.length === 0\)\s*\{[\s\S]*?grid\.innerHTML\s*=\s*alerts\.map\([\s\S]*?\}\)\.join\(''\);\s*\} catch\(err\)',
    '''
    window.allAwarenessAlerts = alerts;
    renderAlertsGrid(alerts, false);
  } catch(err)''',
    c
)

c = c.replace('  function shareAlert(id) {', filter_js + '\n  function shareAlert(id) {')

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('Added filter functionality!')
