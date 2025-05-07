import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';

const AdminMain = () => {
  const [data, setData] = useState({
    memberDtos: [],
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

  const toggleMemberType = (index) => {
    setData((prev) => ({
      ...prev,
      memberDtos: prev.memberDtos.map((member, i) =>
        i === index ? { ...member, memberType: member.memberType === 1 ? 2 : 1 } : member
      ),
    }));
  };

  return (
    <>
      <table className="table table-bordered table-hover mt-4">
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
          {data.memberDtos.length === 0 ? (
            <tr>
              <td colSpan="7">등록된 회원이 없습니다.</td>
            </tr>
          ) : (
            data.memberDtos.map((member, index) => (
              <tr key={member.id} style={{ cursor: 'pointer' }}>
                <td>{index + 1}</td>
                <td>{member.id}</td>
                <td>{member.nickname}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.tel}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMemberType(index);
                    }}
                  >
                    {member.memberType === 1 ? '일반 회원' : '관리자'}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
    </>
  );
};

export default AdminMain;
