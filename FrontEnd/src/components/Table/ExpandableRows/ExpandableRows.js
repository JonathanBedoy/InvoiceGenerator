import React from 'react';
import DataTable from 'react-data-table-component';
import styles from './ExpandableRows.module.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const expandableRow = (props) => {
  return (
    <Container className={styles.ExpandableRow} data-tag="allowRowEvents">
      <Row noGutters>
        <Col xs={{ span: 12, offset: 0 }} md={{ span: 11, offset: 1 }}>
          <DataTable
            // expandOnRowClicked={props.clickBtn ? props.clickBtn(props) : false}
            defaultSortField='size'
            striped
            onClick={props.clickBtn ? props.clickBtn(props) : false}
            noHeader
            highlightOnHover
            title={props.titleExpandable}
            columns={props.data.expandableInfo.columns}
            data={props.data.expandableInfo.rows}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default expandableRow;