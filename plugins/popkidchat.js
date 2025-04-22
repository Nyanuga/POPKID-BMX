import config from '../../config.cjs';

const ChatBotCmd = async (m, Matrix) => {
  try {
    const botNumber = await Matrix.decodeJid(Matrix.user.id);
    const dev = '254732297194@s.whatsapp.net'; // Your VIP number
    const isAuthorized = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net', dev].includes(m.sender);

    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    if (cmd === 'chatbot' || cmd === 'cbot') {
      if (!isAuthorized) return m.reply('*_This command is only for the bot and owner_*');

      let responseMessage;

      if (text === 'on') {
        config.CHAT_BOT = true;
        responseMessage = '*✅ CHAT BOT HAS BEEN ENABLED NOW BOT WILL REACT ON USERS MSG*';
      } else if (text === 'off') {
        config.CHAT_BOT = false;
        responseMessage = '*❌ CHAT BOT HAS BEEN DISABLED NOW BOT WILL NOT REACT ON USERS MSG*';
      } else {
        responseMessage = `*CHAT BOT Usage:*\n\n- \`chatbot on\`  ➜ Enable CHAT BOT\n- \`chatbot off\` ➜ Disable CHAT BOT`;
      }

      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    }
  } catch (error) {
    console.error("heartreact Command Error:", error);
    await Matrix.sendMessage(m.from, { text: '*An error occurred while processing your request.*' }, { quoted: m });
  }
};

export default ChatBotCmd;
