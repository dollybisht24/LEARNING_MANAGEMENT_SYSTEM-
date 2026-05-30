import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Enrollment must have a student'],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Enrollment must have a course'],
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be more than 100'],
    },
    completionStatus: {
      type: String,
      enum: ['enrolled', 'completed', 'dropped'],
      default: 'enrolled',
    },
    completedAt: {
      type: Date,
      default: null,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    lessons: [
      {
        lessonId: mongoose.Schema.Types.ObjectId,
        completed: Boolean,
        completedAt: Date,
      },
    ],
    grade: {
      type: Number,
      default: null,
      min: [0, 'Grade cannot be less than 0'],
      max: [100, 'Grade cannot be more than 100'],
    },
    certificateIssued: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Unique constraint on student and course combination
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);
