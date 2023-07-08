import { Body as BodyText, HeadlineS, HeadlineX, HeadlineXS, SectionContainer } from '@/components';
import React, { FC, PropsWithChildren } from 'react';

const PageHeadline: FC<PropsWithChildren> = ({ children }) => (
  <HeadlineX className="text-center py-8">{children}</HeadlineX>
);

const MainHeadline: FC<PropsWithChildren> = ({ children }) => (
  <HeadlineS className="pt-10 pb-4">{children}</HeadlineS>
);

const SubHeadline: FC<PropsWithChildren> = ({ children }) => (
  <HeadlineXS className="py-4">{children}</HeadlineXS>
);

const Body: FC<PropsWithChildren> = ({ children }) => (
  <BodyText className="py-2">{children}</BodyText>
);

export const GlossaryView = () => {
  return (
    <SectionContainer>
      <div className="max-w-[750px] m-auto pb-32">
        <PageHeadline>Art Print Glossary</PageHeadline>
        <img src="/images/glossary.webp" className="w-full" alt="4 poster" />

        {/* Art Print Glossary */}
        <MainHeadline>Art Print Glossary</MainHeadline>
        <SubHeadline>What is Art Print?</SubHeadline>
        <Body>
          Art print is a hard copy of an original work of art. It can be printed on various printing
          materials using different printing methods.
        </Body>
        <SubHeadline>What is an affiche?</SubHeadline>
        <Body>
          For the affiche word, the Turkish Language Association defines a poster, usually with a
          picture, prepared to announce or promote something, hung where the crowd can see it.
        </Body>
        <SubHeadline>What is a poster?</SubHeadline>
        <Body>
          According to the Turkish Language Institution, the poster means a large picture hanging on
          the wall. Just like another word with a close meaning, it has passed into our language
          from French.
        </Body>
        <Body>Who Invented the Artistic Poster?</Body>
        <Body>
          The invention of the artistic poster is attributed to Jules Chéret. Namely, the French
          government awarded Cheret with the Légion d&apos;honneur, which is considered is the
          highest French order of merit of France, in 1890. This award was given to him for creating
          an art form that meets the needs of Commerce and industry.
        </Body>
        <Body>
          Edmond de Goncourt recognized Chéret as &quot;the first painter of the Paris wall, the
          inventor of the art in the poster&quot; when he toasted the artist at the banquet held in
          his honor.
        </Body>

        {/* Art Print Glossary */}
        <MainHeadline>What are the types of posters?</MainHeadline>
        <SubHeadline>Movie poster</SubHeadline>
        <Body>
          Movie posters are posters that include the name of the movie, the names of the leading
          actors, and generally their pictures, aiming to raise awareness and curiosity about the
          movie. At the bottom of the posters are who made the movie, who the director is and the
          names of the actors.
        </Body>

        <SubHeadline>Election Poster</SubHeadline>
        <Body>
          An election poster is a form of self-promotion used by a party during an election
          campaign. As a rule, election posters are limited to the image of one or more
          representatives of the relevant party, their logo and a short, concise slogan.
        </Body>
        <SubHeadline>Vintage Poster</SubHeadline>
        <Body>
          Vintage Posters are posters that are usually more than 50 years old. Many of these posters
          were created using a printing technique known as lithography. Vintage posters were mostly
          prepared to advertise products and services of that period.
        </Body>
        <SubHeadline>Political Posters and Propaganda Posters</SubHeadline>
        <Body>
          They are poster types that carry the purpose of persuasion and motivation in line with
          political purposes.
        </Body>
        <SubHeadline>Travel Poster</SubHeadline>
        <Body>
          It is a type of poster with artistic value produced to promote a travel destination. One
          example is the Beach Town Posters series, a collection of Art Deco travel posters of
          American beach resorts that epitomize the advertising style of the 1920s and 1930s.
        </Body>
        <SubHeadline>Olympic Poster</SubHeadline>
        <Body>
          An olympic poster, like Tokyo 1964, is a type of banner designed by the host country of
          the Olympic Games for better and easier communication of this major sporting event and is
          part of the promotional plan.
        </Body>
        <Body>All Olympic Posters are property of the International Olympic Committee.</Body>
        <Body>
          Let&apos;s share a historical anecdote: The first Official Olympic poster was for the 1912
          Stockholm Olympics.
        </Body>
        <Body>
          Therefore, there is no official poster for the 1896 Athens Olympics, the first of the
          modern Olympics. However, this poster is used as the de-facto Olympic poster in the
          official report of the 1896 games.
        </Body>
        <Body>
          In this poster, a young woman representing the Acropolis and Athena was preparing to offer
          an olive branch to the victor. The number 776 - 1896, located just above the woman, refers
          to ancient games.
        </Body>
        <Body>There are also other sports-themed posters like Roland Garros (1981) poster</Body>
        <SubHeadline>Bullfighting Posters</SubHeadline>
        <Body>
          A bullfighting poster is an advertisement used to advertise bullfights. Bullfighting
          posters can be interesting in terms of their artistic and historical values.
        </Body>
        <SubHeadline>Decorative Posters</SubHeadline>
        <Body>
          It is the term used for the type of posters that do not carry any marketing value.
        </Body>
        <SubHeadline>Wanted Posters</SubHeadline>
        <Body>
          It is a banner handed out to inform the public of a person that the authorities want to
          capture. They usually contain a picture of the person, a photograph if any, or a composite
          image of a face produced by the police. The posts made by the FBI on its website are also
          considered as posters that fall into this category.
        </Body>
        <SubHeadline>Street Posters</SubHeadline>
        <Body>
          Posters of this form, also called street poster art, are usually handmade or printed
          graphics on thin paper. It can be understood as a work of art placed on the streets rather
          than a gallery or museum. There is no consensus yet that it is a contemporary art form.
        </Body>
        <SubHeadline>Theatre posters</SubHeadline>
        <Body>
          Theatrical poster describes print posters printed for promotional purposes for a
          theatrical production. For detailed information: Sample theater posters
        </Body>
        <SubHeadline>Conference Posters</SubHeadline>
        <Body>
          They are usually large size posters consisting of a single sheet and intended for
          presentation or informational purposes, usually at an academic conference or similar
          event.
        </Body>
        <SubHeadline>Motivational Posters</SubHeadline>
        <Body>
          A motivational poster or inspirational poster is a type of poster usually designed for use
          in schools and offices.
        </Body>
        <SubHeadline>Parody Posters / Demotivational Posters</SubHeadline>
        <Body>
          They are what are commonly known as demotivating posters or parody posters. (eng.
          demotivational poster)
        </Body>
        <SubHeadline>Big Character Posters</SubHeadline>
        <Body>
          Large-character posters usually have a large-character handwritten poster mounted on them.
        </Body>

        {/* What is Original Edition?
         */}
        <MainHeadline>What is Original Edition?</MainHeadline>
        <Body>
          The American Printing Council is expected to meet the following requirements for an
          original print artwork:
        </Body>
        <Body>
          The artist created the main image in or on a plate, stone, woodblock, or other material to
          create the print.
        </Body>
        <Body>
          The print is made from the material in question by the artist or at his direction. The
          finished print is certified by the artist.
        </Body>
        <Body>
          These requirements define today&apos;s original edition, and in any case, it does not
          apply to prints made before 1930.
        </Body>
        <SubHeadline>What are the techniques used for Original Printing?</SubHeadline>
        <Body>
          There are four main techniques for creating an original print work of art in the modern
          sense. These are:
        </Body>
        <SubHeadline>Embossing Print</SubHeadline>
        <Body>
          The basic principle of relief/relief printing is that the desired pattern or image is
          raised to provide a printing surface.
        </Body>
        <SubHeadline>Engraving</SubHeadline>
        <Body>
          Embossing is the opposite of printing. In engraving, the print areas are grooves, grooves,
          or indentations that are lower than the surface of a metal plate.
        </Body>
        <SubHeadline>Molding/Template Printing</SubHeadline>
        <Body>
          It is the application of color or ink to the perforated or cut parts of specially treated
          paper or thin material, and the desired pattern or design comes from the stencil to the
          surface to be printed.
        </Body>
        <SubHeadline>Lithography/Lithography</SubHeadline>
        <Body>
          It is a printing technique, also known as lithography. It was invented by German writer
          and actor Alois Senefelder in 1796 and was originally used mostly for musical notes and
          maps.
        </Body>
        <Body>
          The basis of this technique is that oil and water do not mix, and even oil molecules repel
          water molecules.
        </Body>
        <SubHeadline>What is Illustration?</SubHeadline>
        <Body>
          According to Wikipedia, illustration has the meaning of a picture or pattern that
          describes, embodies, embellishes a text in the print, manuscript, or digital publications.
        </Body>
        <Body>
          The Turkish Language Association defines this word, which came into our language from
          French, as Illustration.
        </Body>
        <Body>
          WordNet&apos;s definition of Illustration is as follows: A work of art that makes a
          concept or term more attractive or understandable.
        </Body>
        <Body></Body>
      </div>
    </SectionContainer>
  );
};
