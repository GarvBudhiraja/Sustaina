// Community functionality
class Community {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('communityPosts')) || [];
        this.groups = JSON.parse(localStorage.getItem('communityGroups')) || [];
        this.messages = JSON.parse(localStorage.getItem('communityMessages')) || [];
        this.initializeEventListeners();
        this.renderPosts();
        this.renderGroups();
        this.initializeMessaging();
    }

    initializeEventListeners() {
        // Post creation form
        const createPostForm = document.getElementById('createPostForm');
        if (createPostForm) {
            createPostForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createPost();
            });
        }

        // Group creation form
        const createGroupForm = document.getElementById('createGroupForm');
        if (createGroupForm) {
            createGroupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.createGroup();
            });
        }

        // Like and comment buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-post')) {
                const postId = e.target.dataset.postId;
                this.likePost(postId);
            } else if (e.target.classList.contains('comment-post')) {
                const postId = e.target.dataset.postId;
                this.showCommentForm(postId);
            }
        });
    }

    createPost() {
        const postContent = document.getElementById('postContent').value;
        const postType = document.getElementById('postType').value;

        if (!postContent) {
            showToast('Please enter some content for your post', 'error');
            return;
        }

        const newPost = {
            id: Date.now().toString(),
            content: postContent,
            type: postType,
            author: 'Current User', // Replace with actual user name when auth is implemented
            likes: 0,
            comments: [],
            createdAt: new Date().toISOString()
        };

        this.posts.unshift(newPost);
        this.savePosts();
        this.renderPosts();
        showToast('Post created successfully!', 'success');
        document.getElementById('createPostForm').reset();
    }

    likePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.savePosts();
            this.renderPosts();
            showToast('Post liked!', 'success');
        }
    }

    showCommentForm(postId) {
        const commentForm = document.createElement('form');
        commentForm.className = 'comment-form';
        commentForm.innerHTML = `
            <textarea placeholder="Write a comment..." required></textarea>
            <button type="submit" class="btn btn-primary">Comment</button>
        `;

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentContent = commentForm.querySelector('textarea').value;
            this.addComment(postId, commentContent);
            commentForm.remove();
        });

        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (postElement) {
            const commentsSection = postElement.querySelector('.comments-section');
            if (commentsSection) {
                commentsSection.appendChild(commentForm);
            }
        }
    }

    addComment(postId, content) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            const newComment = {
                id: Date.now().toString(),
                content: content,
                author: 'Current User', // Replace with actual user name when auth is implemented
                createdAt: new Date().toISOString()
            };

            post.comments.push(newComment);
            this.savePosts();
            this.renderPosts();
            showToast('Comment added successfully!', 'success');
        }
    }

    createGroup() {
        const groupName = document.getElementById('groupName').value;
        const groupDescription = document.getElementById('groupDescription').value;
        const groupType = document.getElementById('groupType').value;

        if (!groupName) {
            showToast('Please enter a group name', 'error');
            return;
        }

        const newGroup = {
            id: Date.now().toString(),
            name: groupName,
            description: groupDescription,
            type: groupType,
            members: ['Current User'], // Replace with actual user ID when auth is implemented
            createdAt: new Date().toISOString()
        };

        this.groups.push(newGroup);
        this.saveGroups();
        this.renderGroups();
        showToast('Group created successfully!', 'success');
        document.getElementById('createGroupForm').reset();
    }

    joinGroup(groupId) {
        const group = this.groups.find(g => g.id === groupId);
        if (group && !group.members.includes('Current User')) {
            group.members.push('Current User');
            this.saveGroups();
            this.renderGroups();
            showToast('Joined group successfully!', 'success');
        }
    }

    initializeMessaging() {
        const messageForm = document.getElementById('messageForm');
        if (messageForm) {
            messageForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const recipient = document.getElementById('messageRecipient').value;
                const content = document.getElementById('messageContent').value;
                this.sendMessage(recipient, content);
            });
        }
    }

    sendMessage(recipient, content) {
        if (!content) {
            showToast('Please enter a message', 'error');
            return;
        }

        const newMessage = {
            id: Date.now().toString(),
            sender: 'Current User',
            recipient: recipient,
            content: content,
            read: false,
            createdAt: new Date().toISOString()
        };

        this.messages.push(newMessage);
        this.saveMessages();
        this.renderMessages();
        showToast('Message sent successfully!', 'success');
        document.getElementById('messageForm').reset();
    }

    renderPosts() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) return;

        postsContainer.innerHTML = this.posts.map(post => `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-date">${new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="post-content">
                    <p>${post.content}</p>
                </div>
                <div class="post-actions">
                    <button class="btn btn-outline like-post" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </button>
                    <button class="btn btn-outline comment-post" data-post-id="${post.id}">
                        <i class="fas fa-comment"></i> ${post.comments.length}
                    </button>
                </div>
                <div class="comments-section">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <span class="comment-author">${comment.author}</span>
                            <p>${comment.content}</p>
                            <span class="comment-date">${new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderGroups() {
        const groupsContainer = document.getElementById('groupsContainer');
        if (!groupsContainer) return;

        groupsContainer.innerHTML = this.groups.map(group => `
            <div class="group-card">
                <div class="group-info">
                    <h3>${group.name}</h3>
                    <p>${group.description}</p>
                    <span class="group-type">${group.type}</span>
                    <span class="group-members">${group.members.length} members</span>
                </div>
                <button class="btn btn-primary join-group" data-group-id="${group.id}">
                    Join Group
                </button>
            </div>
        `).join('');
    }

    renderMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        messagesContainer.innerHTML = this.messages.map(message => `
            <div class="message-card ${message.sender === 'Current User' ? 'sent' : 'received'}">
                <div class="message-header">
                    <span class="message-sender">${message.sender}</span>
                    <span class="message-date">${new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="message-content">
                    <p>${message.content}</p>
                </div>
            </div>
        `).join('');
    }

    savePosts() {
        localStorage.setItem('communityPosts', JSON.stringify(this.posts));
    }

    saveGroups() {
        localStorage.setItem('communityGroups', JSON.stringify(this.groups));
    }

    saveMessages() {
        localStorage.setItem('communityMessages', JSON.stringify(this.messages));
    }
}

// Initialize community features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.community = new Community();
}); 