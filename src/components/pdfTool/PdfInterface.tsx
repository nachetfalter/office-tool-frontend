import ContentCutIcon from '@mui/icons-material/ContentCut';
import MergeIcon from '@mui/icons-material/Merge';
import { useNavigate } from 'react-router-dom';
import ButtonMenu from './../../common/ButtonMenu';

const PdfInterface = (): JSX.Element => {
  const navigate = useNavigate();
  const navigateToLink = (link: string) => {
    navigate(link);
  };

  const functionalities = [
    {
      name: 'PDF to image',
      icon: <ContentCutIcon />,
      clickParameter: '/pdf-tool/split',
      clickHandler: navigateToLink,
    },
    {
      name: 'Image to PDF',
      icon: <MergeIcon />,
      clickParameter: '/pdf-tool/merge',
      clickHandler: navigateToLink,
    },
  ];

  return <ButtonMenu title="PDF Utility Tool" options={functionalities} clickHandler={navigateToLink} />;
};

export default PdfInterface;
