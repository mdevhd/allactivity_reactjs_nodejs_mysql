import "./App.css";
import { useState, Fragment } from "react";
import Axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Input,
  FormGroup,
  Label,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import Header from "./components/Header";
import Datetime from "react-datetime";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function App() {
  const [startat, setStartat] = useState("");
  const [endat, setEndat] = useState(0);
  const [description, setDescription] = useState("");
  const [logsList, setLogsList] = useState([]);
  const MySwal = withReactContent(Swal);
  const getLogs = () => {
    Axios.get("http://localhost:3001/logs").then((response) => {
      setLogsList(response.data);
    });
  };
  const addLog = () => {
    Axios.post("http://localhost:3001/store", {
      startat: startat,
      endat: endat,
      description: description,
    }).then(() => {
      getLogs();
      MySwal.fire("Saved!", "", "success");
    });
  };
  const deleteLog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          getLogs();
          MySwal.fire("Deleted!", "", "success");
        });
      }
    });
  };

  return (
    <Fragment>
      <Header />
      <main className="my-3 py-3">
        <Container className="px-0">
          <h3>Small web application to record time logs</h3>
          <p>Technologies :</p>
          <ul>
            <li>React js</li>
            <li>Node js</li>
            <li>MySQL Database</li>
          </ul>

          <Row className="row">
            <Col className="col-md-12">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Add new log :</CardTitle>
                  <Form>
                    <FormGroup>
                      <Label for="start_at">Start date</Label>
                      <Datetime
                        onChange={(date) => {
                          setStartat(date.format("YYYY-MM-DD H:mm:ss"));
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="end_at">End date</Label>
                      <Datetime
                        onChange={(date) => {
                          setEndat(date.format("YYYY-MM-DD H:mm:ss"));
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        name="text"
                        id="description"
                        onChange={(event) => {
                          setDescription(event.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="info" onClick={addLog} size="sm" outline>
                      Submit
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="row">
            <Col className="col-md-12">
              <Card className="mt-4">
                <CardBody>
                  <CardTitle tag="h5">Logs :</CardTitle>

                  <Button
                    onClick={getLogs}
                    color="primary"
                    size="sm"
                    className="mb-4 float-right"
                    outline
                  >
                    Refresh logs
                  </Button>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logsList.map((val, key) => {
                        return (
                          <tr>
                            <td>{val.start_at}</td>
                            <td>{val.end_at}</td>
                            <td>{val.description}</td>
                            <td style={{width: "10%"}}>
                              {/* <ButtonGroup size="xs">
                                <Button color="primary" size="xs" outline>
                                  Update
                                </Button> 
                                
                              </ButtonGroup> */}
                              <Button
                                  color="danger"
                                  size="xs"
                                  outline
                                  onClick={() => {
                                    deleteLog(val.id);
                                  }}
                                >
                                  Delete
                                </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </Fragment>
  );
}

export default App;
