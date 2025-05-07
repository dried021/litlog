import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Table, Button, Row, Col, Alert } from 'react-bootstrap';
import Pagination from '../../components/Pagination/Pagination';

const AdminMain = () => {
  const [data, setData] = useState({
    userDtos: [],
    pageNum: 1,
    currentPage: 1,
    startPage: 1,
    endPage: 1,
    pageBlock: 5,
    pageCount: 1,
    count: 0,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageNum = parseInt(searchParams.get('pageNum')) || 1;
  const searchName = searchParams.get('searchName') || '';

  useEffect(() => {
    axios
      .get(`http://localhost:9090/admin?pageNum=${pageNum}&searchName=${searchName}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [pageNum, searchName]);

  const toggleUserType = (index) => {
    setData((prev) => ({
      ...prev,
      userDtos: prev.userDtos.map((user, i) =>
        i === index ? { ...user, userType: user.userType === 1 ? 2 : 1 } : user
      ),
    }));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3 className="mb-4">회원 관리</h3>
        </Col>
      </Row>

      {data.userDtos.length === 0 ? (
        <Alert variant="warning">등록된 회원이 없습니다.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th style={{ width: '5%' }}>No</th>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '10%' }}>Nickname</th>
              <th style={{ width: '15%' }}>Name</th>
              <th style={{ width: '18%' }}>Email</th>
              <th style={{ width: '12%' }}>Tel</th>
              <th style={{ width: '20%' }}>User Type</th>
            </tr>
          </thead>
          <tbody>
            {data.userDtos.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.nickname}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>
                  <Button
                    variant={user.userType === 1 ? 'outline-primary' : 'outline-danger'}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserType(index);
                    }}
                  >
                    {user.userType === 1 ? '일반 회원' : '관리자'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Row>
        <Col className="d-flex justify-content-center">
          <Pagination
            currentPage={data.currentPage}
            startPage={data.startPage}
            endPage={data.endPage}
            pageBlock={data.pageBlock}
            pageCount={data.pageCount}
            count={data.count}
            onPageChange={(pageNum) => {
              navigate(`/admin?pageNum=${pageNum}&searchName=${searchName}`);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMain;
