import mongoose, { Document, Schema } from 'mongoose';

export interface INavigationItem extends Document {
    label: string;
    href: string;
}

const NavigationItemSchema: Schema = new Schema({
    label: { 
        type: String, 
        required: true 
    },
    href: { 
        type: String, 
        required: true 
    }
});

const NavigationItem = mongoose.model<INavigationItem>('NavigationItem', NavigationItemSchema);

export default NavigationItem;
