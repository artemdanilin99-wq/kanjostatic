
import requests
from flask import Flask, request, render_template_string

app = Flask(__name__)

# Данные Telegram
TOKEN = "8589711421:AAEaLcA64rLDgp0-emlN0n8Wl8FNWUiiW0o"
ADMIN_ID = "1066519428"

def notify_order(order_info):
    """Отправка уведомления в Telegram через API"""
    message_text = (
        "🏎 **НОВЫЙ ЗАКАЗ: KANJO STATIC**\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n"
        f"👤 **ИМЯ:** `{order_info.get('name')}`\n"
        f"📧 **EMAIL:** `{order_info.get('email')}`\n\n"
        "📦 **ДЕТАЛИ:**\n"
        f"┗ Товар: *{order_info.get('product')}*\n"
        f"┗ Кол-во: {order_info.get('quantity')} шт.\n"
        f"┗ Цена: {order_info.get('price')}\n\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "✅ *Сигнал получен, приступайте к обработке!*"
    )
    
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
    payload = {
        "chat_id": ADMIN_ID,
        "text": message_text,
        "parse_mode": "Markdown"
    }
    
    try:
        requests.post(url, json=payload)
        return True
    except Exception as e:
        print(f"Error sending to TG: {e}")
        return False

# HTML-шаблон в стиле KANJO STATIC
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KANJO STATIC - Order System</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #0a0a0c; color: white; font-family: 'Inter', sans-serif; }
        .neon-border { box-shadow: 0 0 15px rgba(6, 182, 212, 0.4); border: 1px solid rgba(6, 182, 212, 0.5); }
        .neon-text { text-shadow: 0 0 10px rgba(6, 182, 212, 0.8); }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-[#0d0d0f] border border-white/10 p-8 rounded-lg">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black italic tracking-tighter neon-text uppercase">KANJO STATIC</h1>
            <p class="text-[10px] font-mono text-gray-500 tracking-widest uppercase mt-2">Order Management System v1.0</p>
        </div>

        {% if success %}
        <div class="bg-green-500/10 border border-green-500/50 p-6 text-center animate-pulse">
            <p class="text-green-500 font-bold uppercase tracking-tighter">ЗАКАЗ ОТПРАВЛЕН!</p>
            <p class="text-[10px] text-gray-400 mt-2">Сигнал передан администратору в Telegram.</p>
            <a href="/" class="inline-block mt-4 text-xs underline text-white/50 hover:text-white">Вернуться</a>
        </div>
        {% else %}
        <form method="POST" class="space-y-4">
            <div>
                <label class="block text-[10px] font-mono text-gray-500 uppercase mb-1">Ваше Имя</label>
                <input type="text" name="name" required placeholder="АРТЕМ" 
                       class="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all text-sm">
            </div>
            <div>
                <label class="block text-[10px] font-mono text-gray-500 uppercase mb-1">Email</label>
                <input type="email" name="email" required placeholder="PILOT@KANJO.COM" 
                       class="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all text-sm">
            </div>
            <div>
                <label class="block text-[10px] font-mono text-gray-500 uppercase mb-1">Товар</label>
                <input type="text" name="product" required placeholder="ХУДИ KANJO RACER" 
                       class="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all text-sm">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-[10px] font-mono text-gray-500 uppercase mb-1">Количество</label>
                    <input type="number" name="quantity" value="1" min="1" required 
                           class="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all text-sm">
                </div>
                <div>
                    <label class="block text-[10px] font-mono text-gray-500 uppercase mb-1">Цена (₸)</label>
                    <input type="text" name="price" value="2000₸" required 
                           class="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-cyan-400 transition-all text-sm">
                </div>
            </div>
            
            <button type="submit" class="w-full py-4 bg-white text-black font-black italic uppercase tracking-tighter hover:bg-cyan-400 transition-all mt-4">
                Сделать заказ
            </button>

            <button type="button" onclick="fillTest()" class="w-full py-2 border border-white/10 text-[10px] font-mono text-gray-500 hover:text-white transition-all uppercase">
                Заполнить тест
            </button>
        </form>
        {% endif %}

        <div class="mt-8 pt-6 border-t border-white/5 text-[8px] font-mono text-gray-600 text-center uppercase tracking-widest">
            Encryption: AES-256 // System Status: Active
        </div>
    </div>

    <script>
        function fillTest() {
            document.getElementsByName('name')[0].value = 'Тёма';
            document.getElementsByName('email')[0].value = 'test@example.com';
            document.getElementsByName('product')[0].value = 'Футболка';
            document.getElementsByName('quantity')[0].value = 1;
            document.getElementsByName('price')[0].value = '2000₸';
        }
    </script>
</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def index():
    success = False
    if request.method == "POST":
        order_info = {
            "name": request.form.get("name"),
            "email": request.form.get("email"),
            "product": request.form.get("product"),
            "quantity": request.form.get("quantity"),
            "price": request.form.get("price")
        }
        if notify_order(order_info):
            success = True
            
    return render_template_string(HTML_TEMPLATE, success=success)

if __name__ == "__main__":
    app.run(debug=True)
