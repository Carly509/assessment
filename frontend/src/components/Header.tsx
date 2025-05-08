'use client'
import React from "react";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Image from "next/image";
import "./Header.css";

interface SearchState {
  name: string;
  birthday: string;
  type: string;
}
interface HeaderProps {
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
  onSearch: () => void;
}

export default function Header({ search, setSearch, onSearch }: HeaderProps) {
  return (
    <div className="header-card">
      <div className="header-title">Client Directory</div>
      <div className="header-row">
        <fieldset className="input-fieldset wide">
          <legend>Name</legend>
          <input
            className="input"
            type="text"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
        </fieldset>

        <fieldset className="input-fieldset">
          <legend>Birthday</legend>
          <input
            className="input"
            type="text"
            placeholder="MM/DD/YYYY"
            value={search.birthday}
            onChange={(e) => setSearch({ ...search, birthday: e.target.value })}
          />
        </fieldset>

        <fieldset className="input-fieldset">
          <legend>Account Type</legend>
          <select
            className="input"
            value={search.type}
            onChange={(e) => setSearch({ ...search, type: e.target.value })}
          >
            <option value="">Type</option>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </select>
        </fieldset>

        <button className="search-btn" onClick={onSearch}>
          <span role="img" aria-label="search"><FaSearch /></span>
        </button>

        <div className="icons">
          <span className="icon-wrapper" style={{ fontSize: '21px' }} role="img" aria-label="bell">
            <FaBell />
          </span>
          <span className="icon-wrapper" style={{ fontSize: '25px'}} role="img" aria-label="settings">
            <IoMdSettings />
          </span>
          <div className="avatar-container">
            <Image
              src="/img/profile.jpg"
              alt="User Avatar"
              width={40}
              height={40}
              className="avatar-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
