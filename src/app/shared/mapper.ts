/* When I have the time */
/* Write the Mapper Utility for Employee Service to manage response when Autopopulate */
// import { EJSON } from 'bson';

export interface MapperGeneric<T> {
  toResponseDTO: () => Partial<T>;
}

/* ////////////////////////////////////////////////////////////// */
/* /////////////// Mappers for Employee Service////////////////// */
/* ////////////////////////////////////////////////////////////// */

// export class EmployeeResponseMap implements MapperGeneric<EmployeeCollection> {

//     public static toDomain (raw: any): PostDetails {
//       const slug = PostSlug.createFromExisting(raw.slug).getValue();
//       const title = PostTitle.create({ value: raw.title }).getValue();
//       const postType: PostType = raw.type;

//       const memberDetails = MemberDetailsMap.toDomain(raw.Member);

//       const votes: PostVote[] = raw.Votes ? raw.Votes.map((v) => PostVoteMap.toDomain(v)) : [];

//       const postDetailsOrError = PostDetails.create({
//         slug,
//         title,
//         type: raw.type,
//         points: raw.points,
//         numComments: raw.total_num_comments,
//         dateTimePosted: raw.createdAt,
//         member: memberDetails,
//         text: postType === 'text' ? PostText.create({ value: raw.text }).getValue() : null,
//         link: postType === 'link' ? PostLink.create({ url: raw.link }).getValue() : null,
//         wasUpvotedByMe: !!votes.find((v) => v.isUpvote()),
//         wasDownvotedByMe: !!votes.find((v) => v.isDownvote())
//       })

//       postDetailsOrError.isFailure ? console.log(postDetailsOrError.error) : '';

//       return postDetailsOrError.isSuccess ? postDetailsOrError.getValue() : null;
//     }

//     public static toDTO (postDetails: PostDetails): PostDTO {
//       return {
//         slug: postDetails.slug.value,
//         title: postDetails.title.value,
//         createdAt: postDetails.dateTimePosted,
//         memberPostedBy: MemberDetailsMap.toDTO(postDetails.member),
//         numComments: postDetails.numComments,
//         points: postDetails.points,
//         text: postDetails.text ? postDetails.text.value : '',
//         link: postDetails.link ? postDetails.link.url : '',
//         type: postDetails.postType,
//         wasUpvotedByMe: postDetails.wasUpvotedByMe,
//         wasDownvotedByMe: postDetails.wasDownvotedByMe
//       }
//     }
//   }
