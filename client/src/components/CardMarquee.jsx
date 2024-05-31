import Marquee from "react-fast-marquee";
import Testimonial from "./Testimonial";

const testimonail = [
  {
    name:"Satyam Tripathi",
    profession:"Software Engineer",
    rating:"4.5/5",
    comment:"Absolutely life-changing! With their personalized training and nutrition advice, I've lost weight, gained confidence, and feel better than ever"
  },
  {
    name:"Anmol Raman",
    profession:"Team Lead",
    rating:"4/5",
    comment:"I've tried countless diets and workout plans before, but nothing compares to the results I've achieved with their guidance. Their approach is practical, effective, and sustainable. "
  },
  {
    name:"Mansi Suresh",
    profession:"Sales",
    rating:"5/5",
    comment:"I was skeptical at first, but after just a few weeks, I could see and feel the difference. Their knowledge and support have been invaluable in helping me reach my fitness goals"
  },
  {
    name:"Aman Kapoor",
    profession:"Marketing head",
    rating:"4/5",
    comment:"I've been working with them for over a year now, and I'm amazed by my progress. Not only have I transformed my body, but I've also gained a new perspective on health and wellness"
  },
  {
    name:"Suresh Roy",
    profession:"Advocate",
    rating:"4.5/5",
    comment:"I can't thank them enough for their guidance and encouragement. They've helped me overcome obstacles I never thought possible and have inspired me to live a healthier, happier life."
  }
]

const CardMarquee = () => (
  <Marquee className="dark:bg-slate-900">
    
    {testimonail.map((value)=> <Testimonial className="gap-6" name={value.name} profession={value.profession} rating={value.rating} comment={value.comment}/>)}
  </Marquee>
);

export default CardMarquee;
