import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Course must have an instructor'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'web-development',
        'mobile-development',
        'data-science',
        'machine-learning',
        'cloud-computing',
        'devops',
        'cybersecurity',
        'other',
      ],
    },
    duration: {
      type: Number, // in hours
      required: [true, 'Please provide course duration'],
      min: [1, 'Duration must be at least 1 hour'],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    price: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
courseSchema.index({ category: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ level: 1 });

export default mongoose.model('Course', courseSchema);
