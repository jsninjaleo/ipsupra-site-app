import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient';
import { getSanityData } from 'utils/getSanityData';

export const TeamMembers: React.FC = () => {
  const [teamMembersData, setTeamMembersData] = useState<any>({
    title: '',
    members: [],
    mainText: '',
  });

  useEffect(() => {
    const CONTENT_QUERY = `*[_type == "teamMembersSection"] {
      title,
      mainText,
      members[]{
        name,
        role,
        photo,
      }
    }[0]`;
    
    getSanityData(CONTENT_QUERY).then(content => setTeamMembersData(content));
  }, []);

  return (
    <>
      <div className='container mx-auto max-lg:px-10 max-sm:px-5 pt-12'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2'></div>
          <div className='col-span-8'>
            <div className='text-center font-goudy font-medium text-4xl max-xl:text-4xl max-sm:text-2xl tracking-tight'>
              {teamMembersData.title}
            </div>
            <div className='text-center pt-4 font-context font-normal text-base max-sm:text-xs leading-5'>
              {teamMembersData.mainText}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 max-md:grid-cols-subgrid py-16 max-lg:py-8 max-sm:py-4'>
          {teamMembersData.members.map((
            item: {
              name: string,
              role: string, 
              mainText: string, 
              photo: string
            }, index: number) => {
            return (
              <div 
                key={index}
                className='bg-white px-1 py-5'
              >
                <div className='flex justify-center items-center'>
                  <img
                    alt='ClientPhoto'
                    className='w-full'
                    src={urlFor(item.photo).url()} 
                  />
                </div>
                <div className='pt-3'>
                  <div className='max-md:text-center font-common text-yellow-color font-bold text-base max-sm:text-xs leading-7'>
                    {item.name}
                  </div>
                  <div className='max-md:text-center font-common font-normal text-base max-sm:text-xs leading-7'>
                    {item.role}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
