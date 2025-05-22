import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TabMenu from "../../components/Mypage/TabMenu";
import CollectionHeader from "../../components/Mypage/CollectionHeader";
import CollectionEntry from "./CollectionEntry"; 
import styles from "./MyCollections.module.css";
import ProfileSummary from '../../components/Profile/ProfileSummary';

const CreatedCollection = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState({
    field: "date",
    direction: "desc",
  });

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleResetFilters = () => {
    setSortOption({ field: "date", direction: "desc" });
  };

  const handleTabChange = (tab) => {
    navigate(`/${userId}/collections/${tab}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/members/${userId}/collections/created`
        );
        setCollections(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load Collections");
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const sortedCollections = [...collections].sort((a, b) => {
    const { field, direction } = sortOption;

    if (field === "date") {
      return direction === "desc"
        ? new Date(b.creationDate) - new Date(a.creationDate)
        : new Date(a.creationDate) - new Date(b.creationDate);
    } else if (field === "like") {
      return direction === "desc"
        ? b.likeCount - a.likeCount
        : a.likeCount - b.likeCount;
    } else if (field === "comment") {
      return direction === "desc"
        ? b.commentCount - a.commentCount
        : a.commentCount - b.commentCount;
    }

    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.wrapper}>
      <ProfileSummary/>
      <TabMenu userId={userId} />

      <CollectionHeader
        activeTab="created"
        onTabChange={handleTabChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      <div className={styles.grid}>
        {sortedCollections.length === 0 ? (
          <p className={styles["no-collections"]}>No Collections</p>
        ) : (
          sortedCollections.map((collection) => (
            <CollectionEntry key={collection.id} collection={collection} />
          ))
        )}
      </div>
    </div>
  );
};

export default CreatedCollection;
