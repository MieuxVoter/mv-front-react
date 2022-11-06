import { useTranslation } from 'next-i18next';
import Footer from '@components/layouts/Footer';
import TrashButton from './TrashButton';
import {
  faExclamationTriangle,
  faCheck,
  faArrowLeft,
  faPen,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  Container,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useElection } from './ElectionContext';
import CandidateField from './CandidateField';
import AccessResults from './AccessResults';
import LimitDate from './LimitDate';
import Grades from './Grades';
import Private from './Private';

const TitleField = () => {
  const { t } = useTranslation();
  const election = useElection();
  return (
    <Container className="bg-white p-4">
      <Row>
        <Col className="col-auto me-auto">
          <h5 className="text-dark">{t('admin.confirm-question')}</h5>
        </Col>
      </Row>
      <h4 className="text-primary">{election.title}</h4>
    </Container>
  );
};

const CandidatesField = () => {
  const { t } = useTranslation();
  const election = useElection();
  return (
    <Container className="bg-white p-4">
      <Row>
        <Col className="col-auto me-auto">
          <h5 className="text-dark">{t('admin.confirm-candidates')}</h5>
        </Col>
        <Col className="col-auto d-flex align-items-center">
          <FontAwesomeIcon icon={faPen} />
        </Col>
      </Row>
      {election.candidates.map((_, i) => (
        <CandidateField position={i} key={i} className="text-primary" />
      ))}
    </Container>
  );
};

const ConfirmField = ({ onSubmit, goToCandidates, goToParams }) => {
  const { t } = useTranslation();
  const election = useElection();

  return (
    <Container
      fluid="xl"
      className="my-5 flex-column d-flex justify-content-center"
    >
      <Row>
        <Col className="col-lg-3 col-12">
          <Container className="py-4">
            <h4>{t('common.the-vote')}</h4>
          </Container>
          <TitleField />
          <CandidatesField />
        </Col>
        <Col className="col-lg-9 col-12">
          <Container className="py-4">
            <h4>{t('common.the-params')}</h4>
          </Container>
          <AccessResults />
          <LimitDate />
          <Grades />
          <Private />
        </Col>
      </Row>
      <div className="my-5 d-flex justify-content-center">
        <Button
          outline={true}
          color="secondary"
          onClick={onSubmit}
          icon={faArrowRight}
          position="right"
        >
          {t('admin.confirm-submit')}
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmField;