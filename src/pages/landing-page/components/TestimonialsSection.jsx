import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = ({ language }) => {
  const content = {
    en: {
      title: "What Our Users Say",
      subtitle: "Real experiences from Kazakhstan\'s demand-driven marketplace community",
      testimonials: [
      {
        name: "Aigerim Kassymova",
        role: "Consumer, Almaty",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1316a602a-1765591642434.png",
        rating: 5,
        text: "I requested wireless earbuds that weren't available locally. Within two weeks, 50+ people voted, and a business fulfilled the request. The scheduled pickup was smooth and convenient!"
      },
      {
        name: "Dmitry Volkov",
        role: "Business Owner, Nur-Sultan",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b358b248-1764660304309.png",
        rating: 5,
        text: "The demand analytics dashboard is incredible. We can see exactly what customers want before investing in inventory. It's eliminated our guesswork and reduced risk significantly."
      },
      {
        name: "Saule Nurbekova",
        role: "Consumer, Shymkent",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_154608259-1764674275594.png",
        rating: 5,
        text: "The bilingual interface makes it easy to use. I love tracking product lifecycle status and getting notifications when items become available. The reservation system is fair for everyone."
      },
      {
        name: "Arman Bekzhanov",
        role: "Courier, Almaty",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_16298033f-1765905082753.png",
        rating: 5,
        text: "The courier dashboard is well-organized. Delivery schedules are clear, and the pickup point system makes logistics efficient. Great platform for delivery professionals."
      }]

    },
    ru: {
      title: "Что Говорят Наши Пользователи",
      subtitle: "Реальный опыт сообщества платформы спроса Казахстана",
      testimonials: [
      {
        name: "Айгерим Касымова",
        role: "Потребитель, Алматы",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10e153dc6-1764693532822.png",
        rating: 5,
        text: "Я запросила беспроводные наушники, которых не было в наличии. В течение двух недель 50+ человек проголосовали, и бизнес выполнил запрос. Запланированная выдача прошла гладко!"
      },
      {
        name: "Дмитрий Волков",
        role: "Владелец Бизнеса, Нур-Султан",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b358b248-1764660304309.png",
        rating: 5,
        text: "Панель аналитики спроса невероятна. Мы можем точно видеть, что хотят клиенты, прежде чем инвестировать в запасы. Это устранило наши догадки и значительно снизило риск."
      },
      {
        name: "Сауле Нурбекова",
        role: "Потребитель, Шымкент",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_188ecee3c-1764720452238.png",
        rating: 5,
        text: "Двуязычный интерфейс делает использование легким. Мне нравится отслеживать статус жизненного цикла продукта и получать уведомления. Система резервирования справедлива для всех."
      },
      {
        name: "Арман Бекжанов",
        role: "Курьер, Алматы",
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1328d386d-1765905084094.png",
        rating: 5,
        text: "Панель курьера хорошо организована. Графики доставки четкие, а система пунктов выдачи делает логистику эффективной. Отличная платформа для профессионалов доставки."
      }]

    }
  };

  const t = content?.[language];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t?.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {t?.testimonials?.map((testimonial, index) =>
          <div
            key={index}
            className="card p-6 hover:shadow-lg transition-all duration-200">

              <div className="flex items-center gap-4 mb-4">
                <Image
                src={testimonial?.avatar}
                alt={`Profile photo of ${testimonial?.name}, ${testimonial?.role}, sharing positive experience with sur'AL demand-driven marketplace platform`}
                className="w-16 h-16 rounded-full object-cover" />

                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, i) =>
              <Icon key={i} name="Star" size={16} color="var(--color-warning)" className="fill-current" />
              )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial?.text}"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;