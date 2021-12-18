import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useNavigate } from 'react-router-dom';
import ButtonMenu from './common/ButtonMenu';

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const navigateToLink = (link: string) => {
    navigate(link);
  };

  const tools = [
    {
      name: 'PDF Tool',
      icon: <PictureAsPdfIcon />,
      clickParameter: '/pdf-tool',
    },
  ];

  return <ButtonMenu title="Features" options={tools} clickHandler={navigateToLink} />;
};

export default App;
