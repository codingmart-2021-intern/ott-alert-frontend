import React from "react";
import "./Alerts.scss";
import { Tabs, Space, Input, Select, Button } from "antd";
import { genres, filter } from "../../service/data";
import Notify from "../../components/Notifycomp/Notify";
function Alerts() {
  const { TabPane } = Tabs;
  const { Search } = Input;
  const { Option } = Select;

  const onSearch = () => {
    console.log("On search function");
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="alertPage">
      <div className=" card card-nav alert_navbar p-3">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Person" key="1">
            <Space direction="vertical">
              <Search
                placeholder="Enter the Actor Name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                className="fil-elements"
              />
            </Space>
          </TabPane>
          <TabPane tab="Genre" key="2">
            <Select
              style={{ width: "100%" }}
              defaultValue={genres[0].name}
              onChange={handleChange}
              className="fil-elements"
            >
              {genres.map((data, ind) => (
                <Option key={ind} disabled={ind === 0} value={data.name}>
                  {data.name}
                </Option>
              ))}
            </Select>
            <br />
            <Button type="primary" className="m-2">
              Submit
            </Button>
          </TabPane>
        </Tabs>
      </div>
      <div className="card-alert">
        {filter.map((fil, ind) => (
          <Notify key={ind} title={fil} />
        ))}
      </div>
    </div>
  );
}

export default Alerts;
