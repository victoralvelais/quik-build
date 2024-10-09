import React, { useState, useEffect, useMemo } from 'react';
import styles from '~/styles/timeline.module.css';

const Timeline = () => {
  const [completionWidth, setCompletionWidth] = useState('0%');

  const milestones = useMemo(() => [
    { complete: true, content: 'Notion DB & Page builds' },
    { complete: true, content: 'Auto site rebuilds' },
    { complete: false, content: 'User platform integration' },
    { complete: false, content: 'E-commerce support' },
    { complete: false, content: 'Discord builds' },
  ], []);

  useEffect(() => {
    const completedCount = milestones.filter(item => item.complete).length;
    const totalCount = milestones.length;
    const percentage = (completedCount / totalCount) * 100;
    setCompletionWidth(`${percentage}%`);
  }, [milestones]);

  return (
    <section className={styles.timeline}>
      <div 
        className={styles.timelineTrack} 
        style={{ '--completion-width': completionWidth } as React.CSSProperties}
      >
        {milestones.map((item, index) => (
          <div 
            className={styles.timelineItem} 
            key={index} 
            data-complete={item.complete}
          >
            <div className={`milestone-${!item.complete && 'in'}complete`}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;