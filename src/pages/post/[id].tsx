import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import LikeButton from '@components/Post/Buttons/LikeButton';
import SavedButton from '@components/Post/Buttons/SavedButton';
import ShareButton from '@components/Post/Buttons/ShareButton';
import CAImage from '@components/CAImage';
import InteractionButtonsContainer from '@components/Post/Buttons/styles';
import CommentsSections from '@components/Comment/CommentsSections';
import NonAuthAltHeader from '@components/NonAuthAltHeader';
import OptionsMenu from '@components/Post/OptionsMenu';
import InteractionsNumbers from '@components/Post/utils/InteractionsNumbers';
import ProfileImage from '@components/ProfileImage';
import Meta from '@components/SEO/Meta';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import usePostsMutations from '@hooks/postMutations';
import { GET_POST } from '@graphql/queries/post';
import { PostProps } from '@interfaces/Post';
import { ILoggedProfile } from '@interfaces/Profile';
import PostSchema from '@schemas/Post';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import mediaIds from '@utils/mediaIds';
import PostPageContainer from './_styles';

const AudioPlayer = dynamic(() => import('@components/AudioPlayer'), {
  ssr: false,
});
const TextBox = dynamic(() => import('@components/TextBox'));

interface PostPageProps extends ILoggedProfile, PostProps {}

const PostPage: React.FC<PostPageProps> = ({ post, getLoggedProfile }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [likesCount, setLikesCount] = useState<number>();

  const [handleDeletePost, dislikePost, likePost] = usePostsMutations(
    post._id,
    () => {
      setLikesCount(likesCount - 1);
    },
    () => {
      setLikesCount(likesCount + 1);
    },
  );

  const HandlePost = ({ mediaId }: { mediaId: number }) => {
    if (mediaId === mediaIds.image) {
      return (
        <CAImage
          image={post.body}
          options={{
            alt: post.alt,
            className: 'post-image',
            loading: 'lazy',
          }}
        />
      );
    }

    if (mediaId === mediaIds.audio) {
      return (
        <AudioPlayer
          audio={post.body}
          title={post.title}
          darkColor={post.darkColor}
          lightColor={post.lightColor}
          thumbnail={post.thumbnail}
        />
      );
    }

    if (mediaId === mediaIds.text) {
      return (
        <div className="post-text">
          <TextBox text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora qui illum non ex minima animi ab, accusamus magnam doloremque facere vitae aliquam. Labore nulla nobis ipsa consectetur animi maiores consequuntur obcaecati quae cumque cupiditate hic odit fuga provident cum doloribus dolores eveniet magnam, modi ad quisquam incidunt dolorem eaque repellat. Error voluptatum, dolor optio cupiditate ullam deleniti maiores id corporis, recusandae harum maxime eum, dicta debitis corrupti? Obcaecati ex nemo ipsa quod recusandae nobis cumque quaerat unde nesciunt? Illo in ducimus esse facilis, ipsa debitis iure enim veritatis nostrum, magnam magni odio saepe pariatur suscipit dolore fugit? Nemo culpa id praesentium facilis sunt dignissimos totam adipisci, perferendis, corrupti aliquid quis corporis exercitationem quisquam commodi expedita odio eaque! Velit inventore perferendis libero eius sunt pariatur earum. Adipisci maxime facilis veritatis distinctio itaque mollitia eveniet et cupiditate incidunt consequuntur fuga voluptate, veniam dignissimos facere dolore aperiam ad dolores voluptas officiis at ratione excepturi laborum? Aliquid, expedita. Tenetur voluptates saepe minus illo assumenda debitis sunt totam! Debitis obcaecati omnis autem distinctio velit quod a et suscipit quibusdam! Velit, odit consequatur? Illo magni incidunt sit ratione debitis? Libero odio, quam debitis porro officiis magni consectetur! Itaque, consequuntur nihil repellat libero ex maiores facilis quia voluptates odit cum dolor ratione ullam nemo eum et perspiciatis velit obcaecati rerum ea architecto omnis. Illum minus, quidem omnis at placeat doloribus culpa soluta nostrum, voluptatum pariatur quia, obcaecati ad dicta illo aliquid dignissimos ullam. Voluptatibus, aliquid sit magnam error possimus veritatis commodi numquam ratione voluptatem omnis cum enim vero recusandae eum? Voluptate, officia non! Repudiandae dignissimos aspernatur, tempore magnam velit, nesciunt quae aliquid facere, error rem culpa dolorem magni ut doloremque minima explicabo sequi sint maxime quo soluta ea? Exercitationem expedita earum saepe officia cupiditate quo. Doloribus exercitationem eaque perspiciatis accusamus animi est earum, minima rem, consectetur dolorum, at dolor mollitia sapiente vero. Iste obcaecati deserunt explicabo rem labore quas rerum voluptatibus consequuntur facere illum. Culpa omnis quas ad nam. Illum culpa laudantium dolorem omnis inventore ipsam delectus maxime, a qui sunt ab, aspernatur fugit aliquam at, maiores explicabo debitis perspiciatis illo eius corporis animi dignissimos. Saepe sapiente unde ad molestiae atque, consequuntur excepturi asperiores tempora, sit nisi pariatur nulla amet eos nam est eveniet sequi tenetur quod eligendi, voluptates facere cumque omnis magnam cupiditate. Dicta temporibus neque quia illo nemo, explicabo aut sint assumenda inventore! Saepe excepturi ad voluptatum, molestias suscipit in eaque dolores ratione architecto nam sequi voluptates et rem odio quis molestiae. Veniam, corrupti. Cumque sint perferendis totam. Dolores, neque perspiciatis voluptatum voluptatem dolorem qui aut iure cupiditate dolorum nobis voluptatibus incidunt minus expedita sit laudantium nam vel, eligendi et hic saepe est. Hic fugiat cupiditate perferendis, eveniet et veritatis eaque quaerat enim possimus velit saepe culpa dicta nisi, sapiente voluptatem placeat est amet, quod delectus. A corporis rem magnam delectus voluptatum pariatur! Assumenda soluta sint similique quia, harum adipisci consequuntur quibusdam pariatur esse officia ea reprehenderit nesciunt qui molestiae laboriosam rem odit et hic sapiente vel alias dolor. Ipsum molestiae inventore sunt. Quia quae cupiditate ex dolor eum ipsum dolore ratione adipisci beatae ducimus distinctio illum at soluta fuga iure quos doloribus, doloremque rerum reiciendis eos id, laudantium necessitatibus aliquid facilis. Maiores, temporibus eos! Vitae vel dolorem ipsa ea enim harum minus, ratione quas maiores fugiat velit, illum omnis corrupti quasi aliquid! Nisi doloribus in soluta praesentium officia animi expedita veritatis, ipsa libero dolor ex quis, provident nihil possimus explicabo tempore. Sapiente harum numquam expedita veritatis assumenda quia dolorem, quos perspiciatis eos ut deleniti temporibus aperiam quasi nobis blanditiis vitae pariatur magni molestias mollitia minus libero eligendi optio, a dicta. Eum obcaecati architecto molestiae et pariatur placeat possimus eaque consectetur modi hic enim sapiente, adipisci repellat expedita nulla qui quas illo. Eligendi, quibusdam soluta reiciendis impedit blanditiis neque aliquid recusandae illo non. Voluptatum deleniti voluptate aperiam aut illo non sunt cupiditate consequatur quasi explicabo! Fugiat, repellendus incidunt! Praesentium accusamus sunt soluta reprehenderit voluptas eligendi nesciunt autem quae itaque velit, veniam quas voluptatum amet quaerat, sit repellendus culpa pariatur libero voluptates. Corporis, rerum eligendi voluptatem quia quibusdam animi recusandae alias sit quod aut nostrum facilis voluptates, accusantium officia veritatis. Fuga reprehenderit eligendi quidem adipisci aliquam vitae perferendis aut dicta odit excepturi porro hic dolores vero nesciunt accusamus, distinctio molestiae, ab unde deserunt suscipit. Perspiciatis tenetur tempore ducimus nesciunt necessitatibus consectetur corporis excepturi facilis dicta, odio explicabo beatae voluptatibus natus sequi inventore? Sunt obcaecati esse dolorum eveniet aspernatur. Placeat eaque dignissimos non autem magnam, sunt ratione ad quasi aut quas esse deserunt, eos quam dolores suscipit molestiae, nulla pariatur voluptate sit unde. Laboriosam numquam accusantium consequatur laborum provident quidem odio, officia veritatis totam eligendi quos voluptates quo quod soluta reprehenderit, est asperiores optio molestiae, a ad. Eum sint consectetur fugit vitae ad neque minus, id reiciendis ex illo labore doloremque repellat corporis! Odio laborum dignissimos voluptatem totam unde pariatur iste quam mollitia aliquid cumque. At, ipsam ea! Nobis dolores dignissimos voluptatum ratione? Fugit aspernatur aliquid laborum distinctio. Mollitia dolore quasi, saepe in quisquam eligendi. Alias nemo laborum ea nulla earum tempora nostrum id vitae autem voluptatem, rerum perferendis excepturi ab voluptates quis sed explicabo architecto, dolorem maxime qui quo magni non? Distinctio culpa blanditiis, rerum, beatae modi praesentium voluptatum ipsa ipsam minus incidunt, nisi ipsum quibusdam itaque suscipit porro eum commodi consequatur nulla officia impedit! Reiciendis quasi aspernatur in deleniti sit incidunt provident rem animi vero! Harum officia labore quas adipisci quo corrupti ex aspernatur similique eum nobis maiores perferendis maxime nisi ipsum quisquam porro molestiae accusamus, sit omnis? Consequuntur nulla in delectus eaque amet itaque, neque porro mollitia, iste autem voluptas cum perferendis inventore aperiam atque minima quasi recusandae repellendus vero maxime totam dolorem laudantium. Facere illum placeat alias perspiciatis velit ipsum aut possimus labore molestiae, impedit quaerat excepturi dolorum reprehenderit voluptatem. Ut ad totam nesciunt cumque sunt doloribus. Quasi earum molestias qui at excepturi expedita! Vitae dolor repellat quisquam numquam vero iure consequuntur modi nemo tempora ab optio sint sequi tenetur voluptate nobis dignissimos veniam, dolore eaque! Necessitatibus enim voluptatem nulla repudiandae recusandae corrupti quos dignissimos ducimus quas, ea ex vero assumenda commodi, quaerat labore nihil. Ab soluta quaerat ullam doloribus explicabo aperiam officiis atque dicta architecto itaque at veniam est dolorem fugiat, eos accusantium, quas repudiandae rem totam. Distinctio sequi optio saepe necessitatibus explicabo labore voluptatem! Consectetur voluptas, ducimus dolores, est placeat alias fugit qui amet accusantium, labore quisquam! Similique ex magni dolores perspiciatis asperiores eaque exercitationem cupiditate expedita voluptatum itaque saepe aperiam quis labore cumque numquam odio, hic fugiat distinctio ad. Illum dolores totam rerum, sit molestiae vero repellat! Dolor quis praesentium illum eligendi earum, ipsam repellendus et quia cum possimus asperiores nulla repellat nesciunt sed eum accusamus, minus nostrum, distinctio veritatis rem laudantium animi vel? Sequi debitis distinctio dicta ab, perferendis saepe dolore inventore quidem itaque recusandae provident voluptatum odit nostrum assumenda numquam voluptates magni sint totam veritatis iure neque consectetur laudantium? Saepe libero ipsam excepturi voluptatibus aliquid sint iste minus voluptas quisquam ullam vero neque at rerum assumenda temporibus natus eveniet repellat, quis culpa nihil nesciunt dolore? Vel, iure! Rem quidem eum labore officiis asperiores repellendus est consequatur cumque perspiciatis nesciunt, possimus accusantium quaerat, veniam enim magni libero! Officiis, laborum! Adipisci, incidunt, minus voluptatum culpa suscipit ad aspernatur dicta fugit nemo debitis repellendus aut dolor nihil quod quos, voluptates quasi. Ab quam maiores praesentium quae alias hic doloribus, magni ea, non et iste est nulla quas fugit accusantium distinctio eveniet. Reprehenderit odio tempore, quisquam impedit nihil iusto, architecto quia mollitia itaque officiis cumque praesentium fuga alias! Nihil cum fugiat quasi illo necessitatibus. Exercitationem quasi beatae natus est labore quaerat qui soluta, quibusdam laboriosam cumque suscipit! Eveniet molestiae facilis quis unde! Sit animi tempora recusandae, et ut quis? Libero amet ipsum id reiciendis qui autem. Modi, aperiam ea inventore fuga excepturi tenetur provident autem distinctio sapiente nulla rem maxime qui porro enim hic obcaecati ut velit explicabo molestiae esse commodi? Minima quae quo sapiente? Quas, deleniti rerum facilis a reprehenderit tempora sit natus nihil inventore excepturi laboriosam dolorem aperiam ex recusandae cum magni voluptatem saepe atque. Maiores eum ducimus ratione corrupti dolorem magnam qui fugiat voluptate odio corporis ullam deserunt voluptatibus mollitia maxime illum veritatis, odit consequuntur, hic ipsam dolore incidunt, laboriosam quasi sequi. Corrupti vero similique expedita doloribus tempora saepe sapiente in consectetur iste, soluta neque eos delectus repellat voluptas autem? Quos temporibus ad deserunt, nobis in tempore, quod dolore, voluptatibus vitae numquam adipisci? Beatae, nisi numquam enim provident ad velit eaque quas iste explicabo eligendi debitis dolorum obcaecati, expedita sunt! Labore, temporibus amet aliquam est commodi voluptatem. Cum numquam, voluptatibus amet doloribus illo iste laboriosam consequuntur. Quibusdam minus animi dolores, in obcaecati, ipsa, quas maxime illum hic eligendi atque porro nam esse qui quia quisquam. Omnis architecto quisquam vel reiciendis ab cum dolorem veritatis aliquid ex mollitia ullam laudantium ducimus quasi quidem autem aperiam sit, ratione adipisci vero voluptatibus temporibus cumque. Nam corrupti natus doloribus soluta, similique dolore mollitia, ea eligendi obcaecati ab quidem provident ducimus minus. Suscipit deserunt et voluptas neque voluptatibus eius error natus atque a molestias libero rerum officiis, tempora, sed, adipisci iste sit cum quas excepturi eum magnam sapiente sunt. Veniam saepe asperiores corporis eum tenetur vero doloremque quas similique numquam, voluptate quibusdam iure suscipit architecto, in nulla voluptatum culpa nobis blanditiis magnam! Corrupti tempore enim quibusdam excepturi quasi facere nam soluta ad vitae? Id eos ab error ratione culpa, dolor aut officiis totam dolorem maiores quas omnis ipsum, facilis quidem sunt soluta illo at numquam, suscipit deserunt! Quaerat, nesciunt inventore! Et esse illum necessitatibus officia, nobis vitae cum, placeat non maxime hic aut soluta, quo dolores minus! Ducimus, dolorum tenetur laboriosam iusto et harum rem praesentium ex exercitationem veritatis fugiat porro pariatur reprehenderit labore doloremque voluptatibus vel culpa, officia accusamus sint? Adipisci, cum ipsam debitis temporibus optio nostrum sint eveniet maxime rem impedit vel nemo voluptate excepturi doloribus dolore accusantium tempora voluptatum aspernatur error quisquam beatae sapiente voluptatibus et. Maiores minima ullam aspernatur explicabo! Molestias voluptates commodi nostrum aliquid. Delectus autem aperiam quaerat fuga tempora eum nemo tempore fugit eius a, necessitatibus nobis optio nulla pariatur repellat qui ratione aliquid molestias ab officiis facere. Perspiciatis distinctio impedit quidem deleniti, ex mollitia nisi! Deserunt harum nobis cumque dignissimos earum vitae, reprehenderit rem aliquid vel. Praesentium eaque atque nobis tempore iste expedita suscipit eius ipsum? Aliquam facere sunt at dolores, ea id accusantium amet illum eius impedit. Consequuntur, laboriosam praesentium? Quod optio nemo ratione molestias quis fugiat voluptatum deleniti animi nisi, fuga quibusdam necessitatibus expedita nam reiciendis dolorum asperiores nobis tempore corrupti! Accusantium explicabo quis ea voluptate obcaecati possimus enim numquam blanditiis quam id laudantium, at earum impedit exercitationem tenetur dolorum ad vitae alias? Officia, cumque quas totam fuga ipsum dolore obcaecati sint non, quam aperiam, perspiciatis animi hic voluptatibus culpa fugit? Molestias nemo doloribus ullam nam nobis esse perspiciatis nihil nostrum! Delectus nulla consequatur fuga porro eaque, atque quos dolore adipisci hic iusto ea quo, possimus aliquid unde velit! Minus eaque similique esse temporibus illum non incidunt doloremque voluptatum eligendi, odio inventore rem atque vel, officia illo! Perspiciatis cumque deleniti adipisci quae ipsam, iure, rem harum sunt magni nobis excepturi qui optio quibusdam eaque sequi? Dolorum delectus aliquam at velit! Error unde iusto expedita consequatur, ipsum iste atque velit, praesentium debitis sed corporis aut temporibus incidunt. Ducimus, quia sed! Nisi, facilis harum itaque sequi architecto temporibus explicabo minima doloremque. Praesentium architecto adipisci similique fuga expedita beatae dicta accusamus soluta voluptatem ad alias rem repellat, non quae? Dolorem veniam libero alias harum repellendus voluptas non et vero saepe? Libero, ipsum ullam consequatur, et commodi molestias dolorum illum ipsa magni atque maxime, cupiditate placeat dignissimos suscipit tenetur quam incidunt amet nam. Reprehenderit nobis obcaecati quos nisi quisquam at officia. Amet maxime sed, aut, ab expedita nobis, porro enim eveniet officia numquam totam unde. Vero incidunt voluptatibus consectetur earum fugiat aut odio deserunt impedit officia voluptatum dolores adipisci doloribus accusamus ea enim culpa saepe harum, nobis eligendi placeat fuga perferendis tempore eius illum. Rem, modi! Quas, saepe numquam? Odit eaque sunt quis pariatur distinctio vel veritatis itaque adipisci. Natus quia perferendis repellat aut blanditiis doloremque necessitatibus illum aliquid? Quo cum, ullam mollitia, nemo distinctio accusantium beatae, esse libero quod deserunt atque eius aliquam. Inventore amet ullam magnam ad quo nobis voluptatem aperiam! Expedita dolores quibusdam maiores voluptates blanditiis ipsum repellat hic velit vero ut fugiat harum, veniam porro corrupti. Molestiae vitae ut voluptatibus perspiciatis vero incidunt quis, architecto odit, expedita cupiditate laborum, odio aliquid quo porro reiciendis dicta accusamus adipisci dolorem error sequi voluptas quos non officiis facere. Nihil ipsa excepturi numquam repellendus nostrum rerum corrupti ab ipsum aut fuga eligendi, eveniet eos quis dolorem mollitia quaerat. Impedit neque tenetur laudantium autem eveniet atque. Quisquam aperiam perferendis aut officia quia nostrum cum, laudantium culpa beatae excepturi eius perspiciatis molestiae accusamus accusantium ex modi ab vel facilis cupiditate earum? Voluptatibus repellat totam placeat dolor enim consequuntur odit praesentium, sequi at laudantium debitis ab maiores explicabo exercitationem quos voluptate rem facilis. Quam, atque illo suscipit modi est placeat quidem facilis nostrum, aut iste numquam officia neque quo. Fugiat, odit illum. Necessitatibus quaerat architecto expedita perferendis, omnis voluptatum cupiditate autem voluptas saepe numquam provident et odit hic, tempore aliquid molestias quo! Culpa cumque illo laborum, quia quaerat similique tenetur quod doloremque? Fuga, natus! Expedita omnis aliquam minima nisi esse ea repellendus, impedit dignissimos, debitis sint iure eum alias neque placeat officiis inventore laboriosam. Fugit in optio earum velit natus debitis distinctio maxime? Voluptatibus corporis delectus, adipisci omnis, vitae nulla beatae similique quis obcaecati, iste eos sunt suscipit esse illum cum! Hic ad laudantium nam fuga dolor facilis fugiat beatae, architecto et, cupiditate mollitia, omnis ut possimus quam cum autem assumenda sequi consectetur velit voluptatibus qui ex ullam illo. Totam amet blanditiis possimus accusamus et laboriosam alias ipsam, harum voluptatibus, sed deleniti aliquid, esse quod adipisci? Architecto dolores quia modi ullam maxime eius nostrum, earum eos voluptatum voluptate reiciendis a expedita, non enim illum odit. Adipisci nisi vitae voluptate ab sit quam accusantium voluptates similique quibusdam molestias, dolorum nam, facilis suscipit sequi corporis, culpa vel distinctio vero fuga modi nihil ut saepe voluptatibus? Iure consectetur, laudantium quos optio sed sapiente id natus, laborum, voluptatem quas voluptatum dolorum doloribus? Impedit, quibusdam praesentium nemo est ipsum corrupti voluptatem optio, at vel dolores iusto odit earum porro doloribus! Unde eius natus accusantium eveniet assumenda. Sit dolore amet, numquam nobis doloribus quod harum quia culpa vero dicta. Sed distinctio odio inventore expedita reprehenderit quis, facere odit rerum quo ipsum, at corporis debitis. Totam laboriosam repudiandae impedit consequatur quisquam, sapiente necessitatibus laudantium nesciunt ipsum, quo distinctio repellat facere libero? Vitae quas totam id dignissimos blanditiis officiis at eveniet numquam praesentium ullam, voluptate ut ducimus repellat natus fugit cum explicabo maiores, aliquam amet laboriosam velit voluptatibus? Fuga, recusandae praesentium. Quisquam laudantium exercitationem consectetur provident sunt sed unde et perferendis, deserunt consequuntur architecto nemo vitae? Quas error facilis eius exercitationem at sunt veritatis esse dolorum, consectetur, animi libero minus cumque harum praesentium ducimus voluptatem impedit doloribus mollitia! Quidem aliquid ipsum perspiciatis quam corporis cupiditate perferendis molestias atque exercitationem adipisci." />
        </div>
      );
    }

    return <p>erro</p>;
  };

  const handleSEOImage = () => {
    switch (post.mediaId) {
      case mediaIds.audio:
        return post.thumbnail;
      case mediaIds.image:
        return post.body;
      default:
        return `${process.env.NEXT_PUBLIC_HOST}/CardSEO.png`;
    }
  };

  useEffect(() => {
    setLikesCount(post.likesCount);
  }, [post.likesCount]);

  return (
    <>
      <PostPageContainer>
        <Meta
          description={`Post de ${post.artist.name}`}
          keywords={`comp-art, post, artista, divulgação, ${post.artist.name}`}
          title={`Post - ${post.artist.name}`}
          uri={`post/${post._id}`}
          seoImage={handleSEOImage()}
        />
        <NonAuthAltHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main>
          <div id="author">
            <div className="profile">
              <div className="author-info">
                <ProfileImage
                  alt={post.artist.owner}
                  avatar={post.artist.avatar}
                  username={post.artist.owner}
                  className="author-image"
                />
                <a>
                  <div>
                    <strong>{post.artist.name}</strong>
                    <p>@{post.artist.owner}</p>
                  </div>
                  <p>{formatDistanceTimePass(post.createdAt)}</p>
                </a>
              </div>
              <OptionsMenu
                deletePost={handleDeletePost}
                id={post._id}
                username={post.artist.owner}
              />
            </div>
            {post.description && post.mediaId !== mediaIds.text && (
              <div className="description">
                <TextBox text={post.description} />
              </div>
            )}
          </div>
          {(post.body || post.mediaId === mediaIds.text) && (
            <div className="post">
              <HandlePost mediaId={post.mediaId} />
            </div>
          )}
          <div id="comments">
            <div className="interactions-numbers">
              <InteractionsNumbers likesCount={likesCount} post={post} />
            </div>
            <InteractionButtonsContainer className="interactions">
              <LikeButton
                dislikePost={dislikePost}
                likePost={likePost}
                initialLikeState={post.isLiked}
              />
              <SavedButton initialSaveState={post.isSaved} postID={post._id} />
              <ShareButton postID={post._id} />
            </InteractionButtonsContainer>
            {getLoggedProfile && (
              <CommentsSections profile={getLoggedProfile} postId={post._id} />
            )}
          </div>
        </main>
      </PostPageContainer>
      <PostSchema post={post} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const post = await client.query({
    query: GET_POST,
    variables: { id },
    errorPolicy: 'ignore',
  });

  if (!post.data.getPost) {
    return {
      notFound: true,
    };
  }

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      post: post.data.getPost,
      getLoggedProfile,
    },
  };
};

export default PostPage;
