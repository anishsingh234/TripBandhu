import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        imageUrl:v.string(),
    },
    handler:async(ctx,args)=>{
        const user=await ctx.db.query('UserTable')
              .filter((q)=> q.eq(q.field('email'),args.email))
              .collect();

        if(user?.length==0){
            const userData={
                name:args.name,
                email:args.email,
                imageUrl:args.imageUrl
            }
            const result=await ctx.db.insert('UserTable',userData);
            return userData;
        }
        return user[0];
    }
})

export const SavePlanSelection=mutation({
    args:{
        userId:v.string(),
        planName:v.string(),
        price:v.number(),
        billingCycle:v.string(),
        selectedAt:v.string()
    },
    handler:async(ctx,args)=>{
        try {
            const user=await ctx.db.query('UserTable')
                  .filter((q)=> q.eq(q.field('email'),args.userId))
                  .collect();

            if(user?.length>0){
                const updatedUser=await ctx.db.patch(user[0]._id,{
                    currentPlan:args.planName,
                    planPrice:args.price,
                    billingCycle:args.billingCycle,
                    planSelectedAt:args.selectedAt
                });
                return updatedUser;
            }
            return null;
        } catch(error){
            console.error("Error saving plan selection:",error);
            throw error;
        }
    }
})