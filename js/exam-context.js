
/**
 * Exam Prep AI - Context Manager
 */
class ExamContextManager {
    static STORAGE_KEY = 'SOL_EXAM_CONTEXT';

    static setContext(examId, examName, subjectId, subjectName, paperId = null, paperName = null) {
        const context = {
            exam_id: examId,
            exam_name: examName,
            subject_id: subjectId,
            subject_name: subjectName,
            paper_id: paperId,
            paper_name: paperName,
            updated_at: new Date().toISOString()
        };
        window.safeStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
        return context;
    }

    static getContext() {
        const data = window.safeStorage.getItem(this.STORAGE_KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch(e) {
            return null;
        }
    }

    static clearContext() {
        window.safeStorage.removeItem(this.STORAGE_KEY);
    }

    static getPromptString() {
        const ctx = this.getContext();
        if (!ctx) return "";
        let str = `EXAM CONTEXT ALIGNMENT:\nExam: ${ctx.exam_name}\nSubject: ${ctx.subject_name}`;
        if (ctx.paper_name) str += `\nPaper/Section: ${ctx.paper_name}`;
        str += `\nCRITICAL RULE: You MUST strictly align all output, concepts, terminology, and difficulty level to this specific exam and subject context.\n\n`;
        return str;
    }
}

window.ExamContextManager = ExamContextManager;
