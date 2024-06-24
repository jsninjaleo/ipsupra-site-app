import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const Footer: React.FC = () => {
  const [logo, setLogo] = useState<string>('');
  const [coreValueData, setCoreValueData] = useState<any>({
    items: [],
    contactInfo: []
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "footerSection"] {
      items[]{
        title,
        itemTexts
      },
      contactInfo[]{
        title,
        info
      }
    }[0]`;
    getSanityData(CONTENT_QUERY).then(content => setCoreValueData(content));

    const GET_ICON_QUERY = `*[_type == "topSection"] {logo}[0]['logo']`;
    getSanityData(GET_ICON_QUERY).then(content => setLogo(urlFor(content).url()));
  }, []);

  return (
    <div className='relative bg-cover bg-center w-full'>
      <div className='container mx-auto z-10 h-full max-xl:px-10 max-sm:px-5 py-12'>
        <div className='flex justify-start max-md:justify-center'>
          <img
            alt='Logo'
            src={logo}
          />
          <div className='flex max-md:block'>
            {coreValueData.items.map((
              item: {
                title: string,
                itemTexts: string[]
              }, index: number
            ) => {
              return (
                <div
                  key={index}
                  className='pl-48 max-lg:pl-24 max-sm:pl-10'
                >
                  <div className='text-center font-goudy font-medium text-xl max-xl:text-lg max-lg:text-base max-sm:text-sm p-5 border-b text-amber-500 border-amber-300 leading-6 tracking-tight'>
                    {item.title}
                  </div>
                  {item.itemTexts.map((text, index) => {
                    return (
                      <div 
                        key={index}
                        className='pt-5 text-center font-context font-normal text-base max-sm:text-xs leading-4 text-gray-400'
                      >
                        {text}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='bg-black text-white'>
        <div className='container px-0 py-9 max-sm:py-4 mx-auto flex max-sm:block justify-around max-sm:text-center'>
          {coreValueData.contactInfo.map((
            data: {
              info: string
            }, index: number
          ) => {
            return (
              <div 
                key={index}
                className='max-sm:py-2 font-context font-normal text-sm max-md:text-xs leading-8'
              >
                {data.info}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
