import React from 'react';

export interface ServiceItemProps {
  title: string;
  icon: string;
  isActive: boolean;
  features: string[];
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, icon, isActive, features }) => {
  const textColorClass = isActive ? 'text-white' : 'text-stone-500';

  return (
    <div className={`flex flex-wrap gap-5 justify-between mt-28 w-full text-xl ${textColorClass} max-md:mt-10 max-md:mr-2 max-md:max-w-full`}>
      <div className="flex gap-2.5 my-auto">
        {icon ? (
          <img loading="lazy" src={icon} alt="" className="object-contain shrink-0 my-auto w-3 aspect-square" />
        ) : (
          <div className="flex gap-px items-center self-stretch my-auto">
            <div className="flex shrink-0 self-stretch my-auto w-1 h-3 rounded-xl bg-stone-500" />
            <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3 rounded-xl bg-stone-500" />
            <div className="flex shrink-0 self-stretch my-auto w-px h-3 rounded-xl bg-stone-500" />
          </div>
        )}
        <div>{title}</div>
      </div>
      <div>
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {`${index + 1}. ${feature}`}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ServiceItem;