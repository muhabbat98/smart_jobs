import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";

import CloseIcon from "../../../assets/images/Exit.svg";

import "./drawerResume.css";
import LabeledInput from "../labeled-input/LabeledInput";
import TextArea from "antd/es/input/TextArea";
import AddCircle from "../../../assets/images/add-circle.svg";
import JobInsideDrawer from "./JobInsideDrawer";
import { v4 as uuidv4 } from "uuid";
const JobDrawer = ({
  open,
  setOpen,
  jobValues,
  setJobValues,
  getJobFunction,
}) => {
  const [form] = Form.useForm();

  const [childrenDrawer, setChildrenDrawer] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  let isJobEditValues = JSON.parse(localStorage.getItem("isJobEdit"));
  useEffect(() => {
    if (isJobEditValues !== null) {
      form.setFieldsValue(isJobEditValues);
    }
  }, [open, form]);

  const onFinish = (data) => {
    console.log("Success:", data);
    setOpen(false);
    getJobFunction();
    if (isJobEditValues != null) {
      const index = jobValues.findIndex(
        (item) => item.id === isJobEditValues.id
      );
      if (index !== -1) {
        jobValues[index] = data;
        setJobValues([...jobValues]);
        localStorage.removeItem("isJobEdit");
      }
    } else {
      jobValues.push({ ...data, id: uuidv4() });
      setJobValues([...jobValues]);
    }
    localStorage.setItem("jobDrawerValues", JSON.stringify(jobValues));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateMessages = {
    required: "Iltimos, ${label}ni kiriting!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${0} and ${10}",
    },
  };

  return (
    <>
      <Drawer
        title="Ish tajribangiz"
        // width={818}
        size="large"
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <img src={CloseIcon} onClick={onClose} alt="CloseIcon" />
          </Space>
        }
      >
        <div className="content__drawer">
          <Form
            form={form}
            layout="vertical"
            // validateMessages={validateMessages}
            name="basic"
            initialValues={
              {
                // remember: true,
                // requiredMarkValue: requiredMark,
              }
            }
            onFinish={onFinish}
            // onValuesChange={onRequiredTypeChange}
            // requiredMark={requiredMark}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Qaysi kompaniyada ishlagansiz?"
                  labelFor="workedCompany"
                  req={true}
                  input={<Input size="large" />}
                />
              </Col>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Qaysi lavozimda ishlagansiz?"
                  labelFor="workedLevel"
                  req={true}
                  input={<Input size="large" />}
                />
              </Col>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Bandlik turi"
                  labelFor="workedType"
                  req={true}
                  input={
                    <Select
                      // defaultValue="full"
                      placeholder="Bandlik turini tanlang"
                      size="large"
                      // onChange={onChange}
                      options={[
                        {
                          value: "full",
                          label: "To'liq stavka",
                        },
                        {
                          value: "part",
                          label: "Part time",
                        },
                      ]}
                    />
                  }
                />
              </Col>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Joylashuv"
                  labelFor="location"
                  req={true}
                  input={
                    <Select
                      // defaultValue="full"
                      placeholder="Tanlang"
                      size="large"
                      // onChange={onChange}
                      options={[
                        {
                          value: "buxoro",
                          label: "Buxoro",
                        },
                        {
                          value: "toshkent",
                          label: "Toshkent",
                        },
                      ]}
                    />
                  }
                />
              </Col>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Format"
                  labelFor="format"
                  req={true}
                  input={
                    <Select
                      // defaultValue="masofadan"
                      placeholder="Tanlang"
                      size="large"
                      // onChange={onChange}
                      options={[
                        {
                          value: "masofadan",
                          label: "Masofadan",
                        },
                        {
                          value: "offisda",
                          label: "Offisda",
                        },
                      ]}
                    />
                  }
                />
              </Col>
              <Col xs={24} sm={24}>
                <LabeledInput
                  labelName="Ishdagi yutuqlaringiz haqida yozing"
                  labelFor="aboutAwardsOfJob"
                  input={<TextArea rows={4} />}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Row gutter={[12, 5]}>
                  <Col xs={12}>
                    <LabeledInput
                      labelName="Boshlash vaqti"
                      labelFor="beginsMonthOfJob"
                      input={
                        <Select
                          // defaultValue="oy"
                          placeholder="Oy"
                          size="large"
                          // onChange={onChange}
                          options={[
                            {
                              value: "dekabr",
                              label: "Dekabr",
                            },
                            {
                              value: "yanvar",
                              label: "Yanvar",
                            },
                            {
                              value: "fevral",
                              label: "Fevral",
                            },
                            {
                              value: "mart",
                              label: "Mart",
                            },
                            {
                              value: "iyun",
                              label: "Iyun",
                            },
                          ]}
                        />
                      }
                    />
                  </Col>
                  <Col xs={12}>
                    <LabeledInput
                      labelName="&nbsp;"
                      labelFor="beginsYearOfJob"
                      input={
                        <Select
                          // defaultValue="oy"
                          placeholder="Yil"
                          size="large"
                          // onChange={onChange}
                          options={[
                            {
                              value: "2020",
                              label: "2020",
                            },
                            {
                              value: "2021",
                              label: "2021",
                            },
                            {
                              value: "2022",
                              label: "2022",
                            },
                            {
                              value: "2023",
                              label: "2023",
                            },
                          ]}
                        />
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={12}>
                <LabeledInput
                  labelName="Tugash vaqti"
                  labelFor="finishOfJob"
                  valuePropName="checked"
                  input={<Checkbox>Hozirgacha</Checkbox>}
                />
              </Col>
              <Col xs={24} sm={24}>
                <Button
                  block
                  size="large"
                  icon={<img src={AddCircle} alt="" />}
                  onClick={showChildrenDrawer}
                  style={{
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  Qo'shish
                </Button>
              </Col>
            </Row>
            <button
              type="submit"
              style={{ marginTop: "32px" }}
              className="primary-btn"
            >
              Saqlash
            </button>
          </Form>
        </div>

        <Drawer
          title="Ish tajribangiz"
          width={603}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          extra={
            <Space>
              <img
                src={CloseIcon}
                onClick={onChildrenDrawerClose}
                alt="CloseIcon"
              />
            </Space>
          }
        >
          <div className="content__drawer">
            <JobInsideDrawer
              open={childrenDrawer}
              setOpen={setChildrenDrawer}
            />
          </div>
        </Drawer>
      </Drawer>
    </>
  );
};
export default JobDrawer;
