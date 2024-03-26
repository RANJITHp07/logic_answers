// Define the structure for a user
interface User {
    user_id: string;
    logged_in: Date;
    logged_out: Date;
    lastSeenAt: Date;
}

// Define the structure for a user node in the BST
class UserNode {
    constructor(
        public user: User,
        public left: UserNode | null = null,
        public right: UserNode | null = null
    ) {}
}

// Define the BST class
class UserBST {
    root: UserNode | null = null;

    // Method to insert a user into the BST
    insert(user: User): void {
        this.root = this.insertNode(this.root, user);
    }

    // Recursive helper method to insert a user node into the BST
    private insertNode(root: UserNode | null, user: User): UserNode {
        if (!root) {
            return new UserNode(user);
        }

        if (user.logged_in < root.user.logged_in) {
            root.left = this.insertNode(root.left, user);
        } else {
            root.right = this.insertNode(root.right, user);
        }

        return root;
    }

    // Method to count logged-in and active users for a specific month
    countUsersForMonth(targetYear: number, targetMonth: number): [number, number] {
        let loggedInCount = 0;
        let activeCount = 0;
        this.findUsersForMonth(this.root, targetYear, targetMonth, loggedInCount, activeCount);

        return [loggedInCount, activeCount];
    }

    private findUsersForMonth(node: UserNode | null, targetYear: number, targetMonth: number, loggedInCount: number, activeCount: number): void {
        if (!node) {
            return;
        }

        const user = node.user;

        if (user.logged_in.getFullYear() === targetYear && user.logged_in.getMonth() === targetMonth) {
            loggedInCount++;

            // Check if the user is active
            if (user.logged_out.getTime() > new Date(targetYear, targetMonth + 1, 0).getTime() || user.lastSeenAt.getMonth() === targetMonth) {
                activeCount++;
            }
        }

        // Recursively search left and right subtrees
        this.findUsersForMonth(node.left, targetYear, targetMonth, loggedInCount, activeCount);
        this.findUsersForMonth(node.right, targetYear, targetMonth, loggedInCount, activeCount);
    }
}



