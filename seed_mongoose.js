// seed_mongoose.js — define the same schema here and insert docs
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL missing in .env');
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('✅ Connected:', {
      db: mongoose.connection.name,
      host: mongoose.connection.host,
    });

    // Match the schema in server.js
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
    });

    // Same model name => same "contents" collection
    const Content = mongoose.model('Content', ContentSchema);

    console.log('📦 Before:', await Content.countDocuments());

    await Content.deleteMany({});
    await Content.insertMany([
      {
        title: 'Intro to Algebra',
        category: 'Math',
        videoURL: 'https://www.youtube.com/watch?v=QTrVQUz-m8c',
        teacher: 'CoTeach',
        guidingQuestions: 'What is a variable?',
        backgroundKnowledge: 'Basic arithmetic',
        activities: 'Practice problems',
        lessonPlan: 'Intro → examples → practice',
        resources: 'Worksheet A',
      },
      {
        title: 'Photosynthesis Basics',
        category: 'Biology',
        videoURL: 'https://www.youtube.com/watch?v=LgYPeeABoUs',
        teacher: 'CoTeach',
        guidingQuestions: 'Why do plants need light?',
        backgroundKnowledge: 'Cells & organelles',
        activities: 'Leaf diagram labeling',
        lessonPlan: 'Explain → demo → recap',
        resources: 'Diagram handout',
      },
    ]);

    console.log('📦 After:', await Content.countDocuments());
    await mongoose.disconnect();
    console.log('🔌 Done.');
  } catch (e) {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  }
})();

