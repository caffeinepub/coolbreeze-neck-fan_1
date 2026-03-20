import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Miami, FL",
    rating: 5,
    text: "I wore this to a music festival and it was an absolute lifesaver. Everyone kept asking where I got it!",
    avatar: "SM",
  },
  {
    name: "James K.",
    location: "Phoenix, AZ",
    rating: 5,
    text: "Used it while hiking in 105°F heat. The bladeless design means no worries about hair getting caught. Simply amazing.",
    avatar: "JK",
  },
  {
    name: "Priya T.",
    location: "Dallas, TX",
    rating: 5,
    text: "My kids love theirs too. Super quiet in the library, and the battery lasts all day at school. Worth every penny.",
    avatar: "PT",
  },
];

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            What Customers Say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
            Real Reviews
          </h2>
          <p className="text-brand-muted mt-3">
            Thousands of happy customers and counting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-cart rounded-2xl border border-border p-6 hover:shadow-card-hover transition-shadow"
            >
              <Quote className="w-6 h-6 text-primary mb-4 opacity-60" />
              <p className="text-brand-body text-sm leading-relaxed mb-5">
                {review.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-brand-navy text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-brand-muted">{review.location}</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= review.rating
                          ? "fill-brand-star text-brand-star"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
