import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  key?: React.Key;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
  const reduzirMovimento = useReducedMotion();

  return (
    <motion.div
      whileHover={reduzirMovimento ? undefined : { y: -10 }}
      className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:border-nude/30 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-petroleum/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-petroleum transition-colors duration-300">
        <Icon className="text-petroleum w-7 h-7 group-hover:text-nude transition-colors duration-300" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-petroleum">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};
