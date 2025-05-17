import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TabMenu from "../../components/Mypage/TabMenu";
import CollectionHeader from "../../components/Mypage/CollectionHeader";
import CollectionEntry from "./CollectionEntry"; 
import styles from "./MyCollections.module.css";

const CreatedCollection = () => {
  const { userId } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedYear, setSelectedYear] = useState("");
  const [sortOption, setSortOption] = useState({ field: "date", direction: "desc" });
  const years = [2025, 2024, 2023]; 

  const handleYearChange = (year) => setSelectedYear(year);
  const handleSortChange = (option) => setSortOption(option);
  const handleResetFilters = () => {
    setSelectedYear("");
    setSortOption({ field: "date", direction: "desc" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9090/api/members/${userId}/collections/created`,
          {
            params: {
              year: selectedYear,
              sortField: sortOption.field,
              sortDir: sortOption.direction,
            },
          }
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
  }, [userId, selectedYear, sortOption]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.wrapper}>
      <TabMenu userId={userId} />

      <CollectionHeader
        activeTab="created"
        onTabChange={() => {}}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        years={years}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      {/* Card Grid */}
      <div className={styles.grid}>
        {collections.length === 0 ? (
          <p className={styles["no-collections"]}>No Collections</p>
        ) : (
          collections.map((collection) => (
            <CollectionEntry key={collection.id} collection={collection} />
          ))
        )}
      </div>
    </div>
  );
};

export default CreatedCollection;
