import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const data = [
  {
    key: '1',
    codigo: '12gda623',
    codigoParto: '4455',
    edad: 32,
    peso: 12,
    genero: 'Macho',
  },
  {
    key: '2',
    codigo: 'awfwa5256',
    codigoParto: '4455565',
    edad: 42,
    peso: 10,
    genero: 'Hembra',
  },
  {
    key: '3',
    codigo: 'watwwa8148',
    codigoParto: '445574',
    edad: 32,
    peso: 85,
    genero: 'Macho',
  },
  {
    key: '4',
    codigo: 'awwf0065',
    codigoParto: '0055',
    edad: 32,
    peso: 50,
    genero: 'Hembra',
  },
];


export const TablePig = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'codigo',
      key: 'codigo',
      width: '30%',
      ...getColumnSearchProps('codigo'),
    },
    {
      title: 'Codigo de parto',
      dataIndex: 'codigoParto',
      key: 'codigoParto',
      width: '20%',
      ...getColumnSearchProps('codigoParto'),
    },
    {
      title: 'Edad',
      dataIndex: 'edad',
      key: 'edad',
      width: '20%',
      ...getColumnSearchProps('edad'),
    },
    {
      title: 'Peso',
      dataIndex: 'peso',
      key: 'peso',
      width: '20%',
      ...getColumnSearchProps('peso'),
    },
    {
      title: 'Genero',
      dataIndex: 'genero',
      key: 'genero',
      ...getColumnSearchProps('genero'),
      sorter: (a, b) => a.genero.length - b.genero.length,
      sortDirections: ['descend', 'ascend'],
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};
