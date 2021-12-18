import ContentCutIcon from '@mui/icons-material/ContentCut';
import { useNavigate } from 'react-router-dom';
import ButtonMenu from './../../common/ButtonMenu';

const PdfInterface = (): JSX.Element => {
  const navigate = useNavigate();
  const navigateToLink = (link: string) => {
    navigate(link);
  };

  const functionalities = [
    {
      name: 'PDF Split',
      icon: <ContentCutIcon />,
      clickParameter: '/pdf-tool/split',
      clickHandler: navigateToLink,
    },
  ];

  return <ButtonMenu title="PDF Utility Tool" options={functionalities} clickHandler={navigateToLink} />;
};

export default PdfInterface;
