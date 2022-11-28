import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';


function DefaultExample({props}) {
    return (
        <ListGroup as="ol" numbered>
            {props.map((elem, index) => {
                return (
                    <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{elem.task.task}</div>
                            {elem.task.desc}
                        </div>
                        <Badge bg="primary" pill>
                            {Math.round((Date.parse(elem.task.deadline) - Date.now())/(1000*60*60*24))}
                        </Badge>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export default DefaultExample;