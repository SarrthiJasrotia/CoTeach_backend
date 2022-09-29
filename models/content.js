const { default: mongoose } = require("mongoose");

const contentSchema = new mongoose.Schema({
    title: String,
    teacher: String,
    videoURL: String,
    guidingQuestions: String,
    backgroundKnowledge: String,
    activities: String,
    lessonPlan: String,
    resources: String,
    category: String,
})

module.exports = contentSchema;