const { default: mongoose } = require("mongoose");

const ContentSchema = new mongoose.Schema({
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
const Content = mongoose.model("Content" , ContentSchema);

module.exports = Content;