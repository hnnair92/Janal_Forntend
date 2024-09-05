import { reactive } from 'vue';

export type Testimony = {
    name:string;
    testimony:string;
    rating:number;
};


interface TestimonyState {
    testimonyItems: Testimony[];
  }
  
  const state = reactive<testimonyItems>({
    testimonyItems: [
        {
            "name": "Brittny Ladley",
            "testimony": "Very friendly and easy to deal with. I really enjoyed the experience of team coming in and installing my roller shades for me and in a timely fashion. They were quick and efficient. My blinds fit perfectly and are exactly what I expected. They were also priced pretty fair in my opinion! Thanks again!",
            "rating": 5
        },
        {
            "name": "Sandra McGarry",
            "testimony": "Love our new blinds. Whole process from choosing to installation was excellent. Prompt return of phone calls, very polite and friendly. Blinds ready in a timely manner. Installation was quick and efficient. One blind needed adjusting as it interfered with window opening. This was done, no problem. Very happy with everything.  Would definitely recommend. Even better....shop local.",
            "rating": 5
        },
        {
            "name": "Laurie Peloquin",
            "testimony": "Excellent experience. Friendly, not pushy, quick and easy to work with. For service alone they deserve full marks. Add in the quality of the work and you couldn’t ask for better. Our shutters look amazing!",
            "rating": 5
        },
        {
            "name": "Tegan McManus",
            "testimony": "Nothing but positive things to say about our experience with the team. Our custom sized blinds were ordered and installed in a timely manner. Installation appeared to be seamless, and we love the finished product!",
            "rating": 5
        },
        {
            "name": "Melina Panara",
            "testimony": "They have wonderful customer service, great quality blinds, and their installation is seamless and very professional. We would definitely recommend them for anyone looking for blinds!",
            "rating": 5
        },
        {
            "name": "Rose Thomas",
            "testimony": "Excellent experience. Friendly, not pushy, quick and easy to work with. For service alone they deserve full marks. Add in the quality of the work and you couldn’t ask for better. Our shutters look amazing!",
            "rating": 5
        },
        {
            "name": "Jena Baker",
            "testimony": "Great experience! Highly recommend. We got our quote swiftly, got our questions answered promptly. Our order was ready within 3 weeks and installed in a matter of hours! Our installer followed up post installation to ensure we were satisfied. Very happy with purchase.",
            "rating": 5
        },
        {
            "name": "Keith Cavite",
            "testimony": "They did above and beyond with their service. Easy to deal with plus it's locally owned. I had mine installed and I was very pleased with the work they did. Highly recommended! Prices are always competitive, having installation included is always a welcoming plus! They have been great both times, installed it quickly and fixed any issues we had without hassle.",
            "rating": 5
        },
        {
            "name": "James Coe",
            "testimony": "Loving the new kitchen window zebra blinds. The remote control is the best thing but so was the quick turn around time from order to install. Highly recommend for all your windows!",
            "rating": 4
        },
        {
            "name": "Bon L.",
            "testimony": "Prices are always competitive, having installation included is always a welcoming plus! They have been great both times, installed it quickly and fixed any issues we had without hassle.",
            "rating": 5
        },
        {
            "name": "Melissa Neves",
            "testimony": "Just had our new home updated with Zebra blinds and I must say we are in love. We had a few minor inconveniences, the team was quick to address the issues at hand which says a lot about this company and that they stand by their product. Pricing was very reasonable and customer service was outstanding. We will be using them for future projects.. Happy customers!",
            "rating": 5
        },
        {
            "name": "Cath Dickson",
            "testimony": "We received excellent service, nothing was too much trouble. Really happy with our finished blinds, they are a very good quality. Would definitely recommend!",
            "rating": 5
        },
        {
            "name": "Julius Bodai",
            "testimony": "Our experience with the team was very positive. They were very professional and knowledgeable in leading us in the right direction as to what type of shades/blinds were best for us. Their pricing was very reasonable and the installation was very quick. I would highly recommend this company to anyone requiring shades and/or blinds for their home. They have a great selection of products to choose from.",
            "rating": 5
        },
        {
            "name": "Sarah H.",
            "testimony": "We highly recommend it! We met with four different vendors to have our windows measured and blinds installed and no one else compared to the level of customer service and pricing that the team provided. From a character perspective, the representative is very kind, patient, professional and respectful of our home. He was willing to work within our budget and gave us the best price which was incredibly helpful. From a business standpoint, they went above and beyond to meet our needs. We appreciate the privacy we now have due to the installation of our window treatments and everything looks fantastic!",
            "rating": 5
        },
        {
            "name": "Christine Beam",
            "testimony": "The representative was very helpful, kind and patient with me through the entire process.  I had no idea what would work for functionality and updating cosmetic lift on a budget.  He suggested ideas, options and colours that would work.  Installed new window coverings through the entire house.  His prices were better than other places.  He and his team were insanely fast with the install and quickly tidied up thereafter.  LOVE the results of my new blinds.  Highly recommend!",
            "rating": 5
        },]
  });

  export { state};