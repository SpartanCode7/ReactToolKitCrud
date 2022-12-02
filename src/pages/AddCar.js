import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getLoading, saveNewCar } from "../features/cars/carslice";
import { useNavigate } from "react-router-dom";
 
const AddCar = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });
 
  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);
 
  const createNewCar = (data) => {
    let payload = {
      name: data.name,
      description: Number(data.description),
      slug: data.slug,
    };
    disptach(saveNewCar(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Create A New Car</legend>
            <Form onSubmit={handleSubmit(createNewCar)}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formModeldescription">
                <Form.Label>Model description</Form.Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImgUr">
                <Form.Label>Image URL</Form.Label>
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />
              </Form.Group>
              <Button variant="dark" type="submit" disabled={apiStatus === "pending"}>
                {apiStatus === "pending"? "Saving.........": "Save"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
 
export default AddCar;