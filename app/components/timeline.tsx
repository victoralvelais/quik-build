import React, { useState, useEffect } from 'react';

const Timeline = () => {
  const [completionWidth, setCompletionWidth] = useState('0%');

  const milestones = [
    { complete: true, content: 'One-click deploy' },
    { complete: true, content: '24/7 monitoring' },
    { complete: true, content: 'Auto-scaling' },
    { complete: false, content: 'Multi-cloud (Soon)' },
    { complete: false, content: 'AI scaling (Planned)' },
    { complete: false, content: 'CI/CD (Planned)' },
  ];

  useEffect(() => {
    const completedCount = milestones.filter(item => item.complete).length;
    const totalCount = milestones.length;
    const percentage = (completedCount / totalCount) * 100;
    setCompletionWidth(`${percentage}%`);
  }, []);

  return (
    <div className="timeline">
      <div className="timeline-track" style={{'--completion-width': completionWidth} as React.CSSProperties}>
        {milestones.map((item, index) => (
          <div 
            className="timeline-item" 
            key={index} 
            data-complete={item.complete}
          >
            <div className={`milestone-${!item.complete && 'in'}complete`}>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function updateTimelineCompletion() {
  const track = document.querySelector('.timeline-track');
  if (track instanceof HTMLElement) {
    const items = track.querySelectorAll('.timeline-item');
    const completedItems = track.querySelectorAll('.timeline-item[data-complete="true"]');
    const completionPercentage = completedItems.length / items.length;
    track.style.setProperty('--completion-percentage', `${completionPercentage}`);
  }
}

export default Timeline;