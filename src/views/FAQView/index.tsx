import { Body as BodyText, HeadlineX, HeadlineXS, SectionContainer } from '@/components';
import React, { FC, PropsWithChildren } from 'react';

const PageHeadline: FC<PropsWithChildren> = ({ children }) => (
  <HeadlineX className="text-center py-8">{children}</HeadlineX>
);

const SubHeadline: FC<PropsWithChildren> = ({ children }) => (
  <HeadlineXS className="pt-8 font-semibold">{children}</HeadlineXS>
);

const Body: FC<PropsWithChildren> = ({ children }) => (
  <BodyText className="py-2">{children}</BodyText>
);

export const FAQView = () => {
  return (
    <SectionContainer>
      <div className="max-w-[750px] m-auto pb-32">
        <PageHeadline>Sıkça Sorulan Sorular</PageHeadline>
        <SubHeadline>Üyelik işleminde nelere dikkat etmeliyim?</SubHeadline>
        <Body>
          Üye kayıt formunda bilgileriniz eksiksiz ve doğru olmalıdır. Seçeceğiniz şifre kolay
          hatırlayacağınız fakat başkaları tarafından bilinmeyen ya da tahmin edilemeyen bir şifre
          olmalıdır.
        </Body>
        <SubHeadline>Üye olmadan alışveriş yapabilir miyim?</SubHeadline>
        <Body>
          www.opendigitalgallery.com alışveriş sitemizi üye olmadan gezebilirsiniz ve alışveriş
          yapabilirsiniz.
        </Body>
        <SubHeadline>Siparişimi kaç günde teslim alırım?</SubHeadline>
        <Body>
          Sadece poster satın aldığınızda siparişiniz satın alma tarihinden itibaren 48 iş saati
          içinde hazırlanır ve kargoya teslim edilir. Tüm siparişler MNG Kargo ile eve teslim
          gönderilir (tüm siparişler kargo takip numarası ile gönderilir ve hasara karşı
          sigortalıdır).
        </Body>
        <SubHeadline>
          Ürünleri görebileceğimiz fiziki mağazanız var mıdır? Satın aldığım ürünleri mağazanızdan
          bizzat teslim alabilir miyim?
        </SubHeadline>
        <Body>
          Şu anda fiziki bir mağazamız bulunmamaktadır. Ürünlerimizi sadece
          www.opendigitalgallery.com online mağazamız üzerinden satın alabilirsiniz.Tüm
          siparişleriniz Türkiye&apos;nin her yerine kargo ile ister kapınıza isterseniz kargo
          şubesine teslim edilir.
        </Body>
        <SubHeadline>Siparişimin ödemesini nasıl yapabilirim?</SubHeadline>
        <Body>
          Ödemelerinizi alışverişinizi tamamladıktan sonra web sitemiz üzerinden
          gerçekleştirebileceksiniz. Web sitemizde kredi kartı ile ödeme yapabilirsiniz.
          www.opendigitalgallery.com&apos;da online güvenli bir şekilde alışveriş yapabilirsiniz.
          Sitemiz SSL Sertifikası ile korunmaktadır. SanalPos olarak kullandığımız alt yapı
          İyzico&apos;ya aittir.
        </Body>
        <SubHeadline>Kapıda ödeme seçeneğiniz var mıdır?</SubHeadline>
        <Body>Kapıda ödeme seçeneğimiz henüz bulunmamaktadır.</Body>
        <SubHeadline>Aldığım ürünlere KDV dahil midir?</SubHeadline>
        <Body>Tüm ürünlerimizin fiyatına KDV (Katma Değer Vergisi) ilave edilmiştir.</Body>
        <SubHeadline>Fatura kesilirken TC kimlik numaram neden isteniyor?</SubHeadline>
        <Body>
          Web Sitemiz ve internet üzerinden yasal satış yapan bütün sitelerin T.C kimlik no talep
          etmesinin sebebi adınıza hazırlanacak faturalarda T.C. kimlik no bilgisinin maliye
          bakanlığınca zorunlu kılınmış olmasıdır. T.C kimlik numaranız adınıza düzenlenen
          faturalarda ilgili bölüme yazılmak içi talep edilmektedir. Bu bilgi, üye olurken Gizlilik
          Sözleşmemizde de belirttiğimiz gibi, kimseyle paylaşılmamaktadır.
        </Body>
        <SubHeadline>Kredi kartım ile taksitli alışveriş yapabilir miyim?</SubHeadline>
        <Body>
          Web Sitemiz üzerinden ödemelerinizi kredi kartı yöntemi ile yapabilirsiniz. Ödemenizi
          kredi kartınız ile tek çekim olarak yapabileceğiniz gibi, kartınızın özellikleri dâhilinde
          taksitli olarak da sağlamanız mümkündür.
        </Body>
        <SubHeadline>Kargo ücretleri nelerdir?</SubHeadline>
        <Body>
          400 TL üzeri alışverişler ücretsizdir. Daha düşük ödemeye sahip siparişlere kargo ücreti
          eklenir.
        </Body>
        <SubHeadline>Siparişimin kargoya verildiğini nasıl anlayacağım?</SubHeadline>
        <Body>
          Web Sitemizden vermiş olduğunuz siparişleriniz kargoya teslim edildiklerinde e-posta
          adresinize siparişiniz ile ilgili kargo sevk bilgileri gönderilir.
        </Body>
        <SubHeadline>Siparişimi takip edebilir miyim?</SubHeadline>
        <Body>
          Evet, takip edebilirsiniz. Siparişiniz kargoya verildikten sonra e-posta adresinize
          gönderilen sipariş numaranızı kullanarak siparişinizin kargo sürecini sorgulayabilirsiniz.
        </Body>
        <SubHeadline>Kargom geldiğinde teslimat adresinde değildim, ne yapmalıyım?</SubHeadline>
        <Body>
          Belirtilen adreste bulunmamanız durumunda, siparişiniz en yakın kargo şubesine teslim
          edilir ve size bir bilgi notu bırakılır. Kargonuzu 3 gün* içinde sipariş numaranız ile
          birlikte en yakın kargo şubesinden teslim alabilirsiniz. Siparişiniz belirtilen sürede
          teslim almadığınız takdirde opendigitalgallery.com&apos;a iade edilir.
        </Body>
        <SubHeadline>Posterleri nasıl gönderiyorsunuz?</SubHeadline>
        <Body>
          Siparişini verdiğiniz posterler atölyemizde önce itinalı şekilde ambalajlanır ve kapaklı
          özel silindir kutu içerisinde gönderilir. Bu sayede posterler taşıma sürecinde zarar
          görmeden size ulaşır.
        </Body>
        <SubHeadline>Posterlere çerçeve dahil midir?</SubHeadline>
        <Body>Hayır, posterlere çerçeve dâhil değildir.</Body>
        <SubHeadline>Posterlerinizin kağıt kalitesi nedir?</SubHeadline>
        <Body>
          Tüm baskılarımız mat 300 gr kuşe kâğıt üzerine yapılır. Baskı detayları ve yüksek renk
          doğruluğu ile ürünün kalitesi tek bir bakışta anlaşılmaktadır.
        </Body>
        <SubHeadline>Kişiye özel ölçü ve tasarımda poster yapıyor musunuz?</SubHeadline>
        <Body>
          Ölçüler web sitemizde belirtildiği gibidir. Bu ölçüler dışında başka ölçülerde üretim
          yapılmamaktadır. Şu anda, istek üzerine tasarım veya kişisel baskı yapılmamaktadır.
        </Body>
        <SubHeadline>
          Poster baskının renkleri mönitörümde gördüğüm renklerle aynı mıdır?
        </SubHeadline>
        <Body>
          Baskılarımızın renkleri web sitemizde gösterilen renklerle aynıdır. Monitörünüzde renkleri
          en doğru şekilde görebilmeniz için size monitörünüzün renk kalibrasyonunu doğru yapmanızı
          öneririz. Bunun yanı sıra, kullandığımız kâğıdın yüzeyi monitörün parlaklığına sahip
          olmadığını da göz önünde bulundurmanız gerekir.
        </Body>
        <SubHeadline>
          Sipariş ettiğim ürünler taşıma sırasında zarar görür veya kaybolursa ne olur?
        </SubHeadline>
        <Body>
          Kargo şirketi ürüne taşıma esnasında hasar verir veya ürünü kaybederse size ücretsiz
          olarak o ürünün yenisi gönderilir. Siparişiniz ile ilgili bizden kaynaklanan her türlü
          hata veya hasar yine ücretsiz olarak düzeltilir.
        </Body>
        <SubHeadline>
          Siparişimi tamamladıktan sonra sipariş onay maili gönderecek misiniz?
        </SubHeadline>
        <Body>
          Evet, alışverişinizi tamamlayıp ödemenizi yaptıktan sonra e-mail adresinize alışverişinize
          ilişkin tüm detayları içeren bir sipariş onay e-maili gönderilir. Siparişiniz ödeme
          alındıktan sonra işleme alınır.
        </Body>
        <SubHeadline>Özel kampanyalardan haberdar olmak istiyorum ne yapmalıyım?</SubHeadline>
        <Body>
          Kampanya ve indirimlerimizden haberdar olmak için e-bültenimize kayıt olabilirsiniz.
        </Body>
      </div>
    </SectionContainer>
  );
};
