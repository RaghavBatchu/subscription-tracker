import mongoose  from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for the subscription plan"],
        trim: true,
        minLength: 3,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for the subscription plan"],
        min: [0, "Price must be greater than 0"]
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"],
        default: "USD"
    },
    frequency: {
        type: String,
        enum: ["monthly", "yearly", "weekly", "daily"],
    },
    category: {
        type: String,
        enum: ["entertainment", "technology","productivity", "education", "health", "sports", "other"],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["active", "canceled", "expired"],
        default: "active"
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: "Start date cannot be in the future"
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }

}, { timestamps: true });

//automatically calculate renewal date based on frequency
subscriptionSchema.pre("save", function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    //auto update status if the renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;