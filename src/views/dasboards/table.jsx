import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";

export const TablePig = ({ dataPick }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reiniciar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Código",
      dataIndex: "birth_code",
      key: "birth_code",
      width: "20%",
      ...getColumnSearchProps("birth_code"),
    },
    {
      title: "Código de Parto",
      dataIndex: "parent_id",
      key: "parent_id",
      width: "20%",
      render: (text, record) => (text ? text.toString() : record.id.toString()),
      ...getColumnSearchProps("parent_id"),
    },
    {
      title: "Género",
      dataIndex: "gender",
      key: "gender",
      width: "15%",
      ...getColumnSearchProps("gender"),
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
      width: "15%",
      ...getColumnSearchProps("weight"),
      sorter: (a, b) => a.weight - b.weight,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "birth_date",
      key: "birth_date",
      width: "20%",
      ...getColumnSearchProps("birth_date"),
    },
  ];

  return <Table columns={columns} dataSource={dataPick} scroll={{ x: "max-content", y: "max-content" }} />;
};
