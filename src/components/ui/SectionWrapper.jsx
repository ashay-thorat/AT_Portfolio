import { motion } from 'motion/react';
import { staggerContainer } from '../../utils/motion';

const SectionWrapper = ({ children, id, className = '' }) => {
  return (
    <motion.section
      id={id}
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      style={{
        padding: '100px 0',
        position: 'relative',
      }}
      className={className}
    >
      <div className="container-main">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
