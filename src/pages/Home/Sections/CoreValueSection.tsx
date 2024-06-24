import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const CoreValue: React.FC = () => {
  const [coreValueData, setCoreValueData] = useState<any>({
    title: '',
    items: [],
    backgroundImage: ''
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "coreValueSection"] {
      title,
      backgroundImage,
      items[]{
        icon,
        title,
        mainText,
      },
    }[0]`;

    getSanityData(CONTENT_QUERY).then(content => setCoreValueData(content));
  }, []);

  return (
    <div 
      className='relative bg-cover bg-center w-full flex bg-corevalue-cover-color'
      style={{ backgroundImage: `url(${coreValueData.backgroundImage !== '' ? 
        urlFor(coreValueData.backgroundImage).url() : 
        ''
      })`}}
    >
      <div className='absolute w-full h-full bg-custom-gradient opacity-35 z-auto'></div>
      <div className='container mx-auto z-10 h-full max-xl:px-10 max-sm:px-5 py-12'>
        <div className='flex justify-center items-center text-center font-goudy font-medium text-white text-5xl max-xl:text-4xl max-sm:text-2xl tracking-tight'>
          {coreValueData.title}
        </div>
        <div className='col-span-12 pt-11 pb-5 max-sm:pb-0'>
          <div className='grid grid-cols-2 gap-y-16 gap-x-4'>
            {coreValueData.items.map((
              item: {
                title: string, 
                mainText: string, 
                icon: string
              }, index: number
            ) => {
              return (
                <div key={index} className='grid grid-cols-3 max-md:col-span-2'>
                  <div>
                    <img 
                      alt='Experience Icon'
                      src={urlFor(item.icon).url()}
                    />
                  </div>
                  <div className='col-span-2'>
                    <div className='flex items-center font-goudy font-medium text-white text-xl max-lg:text-lg max-md:text-base max-sm:text-sm leading-5 tracking-tight'>
                      {item.title}
                    </div>
                    <div className='flex pt-4 font-context font-normal text-core-color text-base max-sm:text-xs leading-5 tracking-tight'>
                      {item.mainText}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
