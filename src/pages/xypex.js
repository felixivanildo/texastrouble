import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Style/NotificationList.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function NotificationList() {

  const [notifications, setNotifications] = useState ([
    {
      "title": "Titulo da Notificação",
      "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam enim arcu, ut egestas nulla finibus in.",
      "avatar": "https://placekitten.com/200/207",
      "time": "Há esse tempo atrás" 
    }])



  const [search, setSearch] = useState('');
  const [clickedSettings, setClickedSettings] = useState(null);

  const handleSettingsClick = (index) => { /* garante que as opções nao apareção em todas as notificações */
    setClickedSettings(clickedSettings === index ? null : index);
  };

  const filteredNotifications = notifications.filter((notification) => {
    return search.toLowerCase() === '' ? true : notification.content.toLowerCase().includes(search);
  }); /* filtra as notificações */

  const resetSettings = () => {
    setClickedSettings(null); /* impede que o menu de opções continue aparecendo mesmo apos filtrar as notificacoes */
  };

  
  useEffect(()=>{
    const autoexec = async() =>{
      console.log('retrieved.data)')  
      const retrieved = await axios.get("http://10.254.4.132:3010/api/notifications")
        
        setNotifications(retrieved.data)
    }

    autoexec()
  },[])

  return (
    <div className='notifybody'>
      <div className='container'>
      <h1>Notificações</h1>

      <input className="filtrar-notificacoes" onChange={(e) => {
        setSearch(e.target.value);
        resetSettings();
      }}
        placeholder="Filtrar" />
        </div>

      <div className="notifylista-notificacoes">

        {filteredNotifications.map((notification, index) =>
          <div key={index} className="notifyitem-notificacao">

            <img src={notification.avatar} alt="avatar" className="avatar" />

            <div className="notifyconteudo-notif">

              <strong>{notification.title}</strong>

              <div className='notifyconfig' onClick={() => handleSettingsClick(index)}>
                <MoreHorizIcon />
              </div>
              {clickedSettings === index && (
                <ul className='notifyopcoes'>{/* menu de opções aonde algumas devem ficar caso sejam necessarias*/}
                  <li>Opção 1</li>
                  <li>Opção 2</li>
                  <li>Opção 3</li>
                </ul>
              )}
              <br />
              {notification.content}
              <div className='notifytime'>
                <AccessTimeIcon id='time-icon' />
                {notification.time}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
