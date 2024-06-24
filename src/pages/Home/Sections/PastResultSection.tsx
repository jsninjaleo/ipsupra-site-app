import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const PastResult: React.FC = () => {
  const [pastResultData, setPastResultData] = useState<any>({
    title: '',
    items: [],
    mainText: '',
    buttonText: ''
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "pastResultSection"] {
      title,
      mainText,
      buttonText,
      items[]{
        name,
        role,
        photo,
        mainText,
      }
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setPastResultData(content));
  }, []);

  return (
    <>
      <div className='bg-training-color'>
        <div className='container mx-auto max-lg:px-10 max-sm:px-5 pt-12 max-sm:text-center'>
          <div className='grid grid-cols-12'>
            <div className='col-span-8 max-md:col-span-12'>
              <div className='font-goudy font-medium text-4xl max-xl:text-4xl max-sm:text-2xl tracking-tight'>
                {pastResultData.title}
              </div>
              <div className='flex pt-4 font-context font-normal text-base max-sm:text-xs leading-5'>
                {pastResultData.mainText}
              </div>
            </div>
            <div className='col-span-4 mt-10 max-xl:col-span-12 flex justify-end items-center max-sm:justify-center'>
              <div className='text-center w-fit rounded cursor-pointer text-xl max-sm:text-base bg-yellow-500 text-teal-900 font-common font-normal px-5 max-sm:px-4 py-3'>
                {pastResultData.buttonText}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 max-md:grid-cols-1 py-16 max-sm:py-8'>
            {pastResultData.items.map((
              item: {
                name: string,
                role: string, 
                mainText: string, 
                photo: string
              }, index: number) => {
              return (
                <div
                  key={index}
                  className={'bg-white px-7 py-9 max-sm:px-3 max-sm:py-4 max-md:border'}
                >
                  <div className='pt-4 font-context font-normal text-gray-600 text-base max-sm:text-xs leading-7'>
                    {item.mainText}
                  </div>
                  <div className='flex max-sm:block items-center pt-4'>
                    <div className='pr-5 max-sm:pr-0 flex justify-center items-center'>
                      <img
                        alt='ClientPhoto'
                        src={urlFor(item.photo).url()} 
                      />
                    </div>
                    <div className='max-sm:pt-5'>
                      <div className='font-context font-bold text-base max-sm:text-xs leading-7'>
                        {item.name}
                      </div>
                      <div className='font-context font-normal text-yellow-color text-base max-sm:text-xs leading-7'>
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
