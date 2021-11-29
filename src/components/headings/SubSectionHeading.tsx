import ButtonLink from '../links/ButtonLink';

interface SubSectionProps {
  actionHref: string;
  actionName: string;
  text: string;
}

const SubSectionHeading: React.FC<SubSectionProps> = ({ actionHref, actionName, text }) => {
  return (
    <div className='pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{text}</h3>
      <div className='mt-3 sm:mt-0 sm:ml-4'>
        <ButtonLink variant='dark' href={actionHref}>
          {actionName}
        </ButtonLink>
      </div>
    </div>
  );
};

export default SubSectionHeading;
