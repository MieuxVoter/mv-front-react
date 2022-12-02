import {useState, useEffect, useRef} from 'react';
import {Row, Col, Label, Input, Modal, ModalBody, Form} from 'reactstrap';
import {faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'next-i18next';
import Image from 'next/image';
import {useElection, useElectionDispatch} from '@services/ElectionContext';
import Button from '@components/Button';
import {GradeItem} from '@services/type';


const GradeModal = ({isOpen, toggle}) => {
  const {t} = useTranslation();
  const election = useElection();
  const dispatch = useElectionDispatch();
  const [grade, setGrade] = useState<GradeItem>({name: "", description: "", value: -1, active: true});

  useEffect(() => {
    const maxValue = Math.max(...election.grades.map(g => g.value));
    setGrade({...grade, value: maxValue + 1});
  }, [election]);


  const save = () => {
    dispatch({
      type: 'set',
      field: 'grades',
      value: [...election.grades, grade],
    });
    toggle();
  };

  const handleName = (e) => {
    setGrade((s) => ({...s, name: e.target.value}));
  };

  const names = election.grades.map(g => g.name)
  const disabled = grade.name === "" || names.includes(grade.name);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      keyboard={true}
      className="modal_grade"
    >
      <div className="modal-header p-4">
        <h4 className="modal-title">{t('admin.add-grade')}</h4>
        <button
          type="button"
          onClick={toggle}
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <ModalBody className="p-4">
        <p>{t('admin.add-grade-desc')}</p>
        <Col>
          <Form className="container container-fluid">
            <div className="mb-3">
              <Label className="fw-bold">{t('common.name')} </Label>
              <Input
                type="text"
                placeholder={t('admin.grade-name-placeholder')}
                value={grade.name}
                onChange={handleName}
                autoFocus
                required
              />
            </div>
            <div className="mt-5 gap-2 d-grid mb-3 d-md-flex">
              <Button
                onClick={toggle}
                color="dark"
                className="me-md-auto"
                outline={true}
                icon={faArrowLeft}
              >
                {t('common.cancel')}
              </Button>
              <Button disabled={disabled} color="primary" onClick={save} icon={faPlus}>
                {t('common.save')}
              </Button>
            </div>
          </Form>
        </Col>
      </ModalBody>
    </Modal>
  );
};
export default GradeModal;