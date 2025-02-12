import mongoose, { Schema } from "mongoose";
import { IUserDocument, UserRole } from "../types/user.model";

// services
import { PasswordService } from "../services/password.service";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole)
    }
}, { timestamps: true });



//Midddleware 
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        this.password = await PasswordService.hash(this.password);
        next();
    } catch (error) {
        next(error as Error);
    }
});

//Method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return PasswordService.compare(candidatePassword, this.password);
}


//export
export default mongoose.model<IUserDocument>('User', userSchema);