import { Body, Headline, SectionContainer } from '@/components';
import React from 'react';

export const AboutView = () => {
  return (
    <div className="min-h-[calc(100vh-210px)]">
      <SectionContainer>
        <div className="md:px-32">
          <Headline className="py-8">Hakkımızda</Headline>
          <div className="flex flex-col gap-4 pb-10">
            <Body>
              Open Digital Gallery hali hazırda e-ticaret sayesinde ürettiği art printleri
              kullanıcılarına ileten bir şirkettir. Uzun vadede ekibimiz içinde bulunan artistlerle
              birlikte büyük bir sanat topluluğu yaratmayı hedefliyoruz. İlerleyen fazlarında ise
              globalde ölçeklenebilir bir teknoloji şirketi olmak ve endüstriyelleşmiş sanat
              üretiminin faydalarından yararlanırken yaratıcı ruhumuzdan taviz vermeden sanatın
              toplumun her kesimi için erişilebilir olmasını hedefliyoruz.
            </Body>
            <Body>
              Şu an için Türkiye çapında online fine art resim ve fotoğraf baskı satışı yapan bir
              internet sitesi olarak operasyonlarımızı sürdürüyoruz. 300 gram mat kağıda yüksek
              kalitede basılarak dünya standartlarındaki ölçülerde üretilen eserler bir hayli iyi
              çözünürlüktedir.
            </Body>
            <Body>
              Websitemizdeki alışveriş deneyiminin keyfini çıkarmanız dileğiyle.Eğer bir öneriniz
              veya yorumunuz olursa bizimle iletişime geçmekten çekinmeyin.
            </Body>
            <Body>Sevgiler.</Body>
            <Body>Open Digital Gallery Ekibi.</Body>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
