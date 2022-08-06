import React, { useState, useEffect} from 'react'
import { Button, Menu, Typography, Avatar, Layout } from 'antd';
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'

const { Header, Content, Footer, Sider } = Layout;
const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    useEffect(() => {
      const handleResize = () => {
        setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);
      }
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
      if(screenSize < 768){
        setActiveMenu(false)
      } else{
        setActiveMenu(false)
      }
    }, [screenSize])

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
          console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
      }}
    >
      <div className='logo-container'>
          <Avatar src={icon} size='large'/>
          <Typography.Title level={2} className='logo'>
              <Link to='/'>enCrypt</Link>
          </Typography.Title>
      </div>
      <Menu
          theme="dark"
          mode="inline"
      >
        <Menu.Item icon={<HomeOutlined/>} key='Home'>
            <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined/>} key='Cryptocurrencies'>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined/>} key='News'>
            <Link to='/news'>News</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    // <div
    //   style={{
    //     width: 256,
    //   }}
    // >
    //   <Button
    //     type="primary"
    //     onClick={toggleCollapsed}
    //     style={{
    //       marginBottom: 16,
    //     }}
    //   >
    //     {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    //   </Button>
    //   <Menu
    //     // defaultSelectedKeys={['1']}
    //     // defaultOpenKeys={['sub1']}
    //     mode="inline"
    //     theme="dark"
    //     inlineCollapsed={collapsed}
    //     // items={items}
    //   >
    //     <Menu.Item icon={<HomeOutlined/>}>
    //           <Link to='/'>Home</Link>
    //       </Menu.Item>
    //       <Menu.Item icon={<FundOutlined/>}>
    //           <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
    //       </Menu.Item>
    //       <Menu.Item icon={<BulbOutlined/>}>
    //           <Link to='/news'>News</Link>
    //       </Menu.Item>
    //   </Menu>
    // </div>
    // <div className='nav-container'>
    //     <div className='logo-container'>
    //         <Avatar src={icon} size='large'/>
    //         <Typography.Title level={2} className='logo'>
    //             <Link to='/'>enCrypt</Link>
    //         </Typography.Title>
    //         <Button
    //             className='menu-control-container'
    //             onClick={()=> setActiveMenu(!activeMenu)}
    //         >
    //             <MenuOutlined />
    //         </Button>
    //     </div>
    // </div>
  )
}

export default Navbar